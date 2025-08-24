// backend/routes/genV2Router.js
const express = require('express');
const router = express.Router();

// ---------- In-memory stores (Phase 1) ----------
/**
 * imageJobs: text -> image candidates
 *   { id, prompt, status:'queued|processing|done|error', images:[{url,width,height}], errorMessage }
 *
 * threeJobs: selected image -> 3D GLB (no base GLB)
 *   { id, imageUrl, status, result:{glbUrl,maps,previewUrl}, errorMessage }
 */
const imageJobs = new Map();
const imageQueue = [];
const threeJobs = new Map();
const threeQueue = [];

const LEASE_TTL_MS = (process.env.JOB_LEASE_TTL_SEC ? Number(process.env.JOB_LEASE_TTL_SEC) : 300) * 1000;
const now = () => new Date().toISOString();
const makeId = (p='job') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;

function lease(queue, store) {
  for (let i = 0; i < queue.length; i++) {
    const id = queue[i];
    const j = store.get(id);
    if (!j) continue;
    if (j.status !== 'queued' && j.status !== 'processing') continue;
    if (j.status === 'processing') {
      const t = j.leasedAt ? new Date(j.leasedAt).getTime() : 0;
      if (j.leased && (Date.now() - t) <= LEASE_TTL_MS) continue;
    }
    j.leased = true; j.leasedAt = now(); j.status = 'processing'; j.updatedAt = now();
    store.set(id, j);
    return j;
  }
  return null;
}

// ---------- PUBLIC: Text -> Image ----------
router.post('/api/prompt-image', (req, res) => {
  const { prompt, candidates = 4, seed } = req.body || {};
  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'Missing prompt' });
  const id = makeId('img');
  imageJobs.set(id, {
    id, prompt, candidates: Math.min(Math.max(+candidates || 4, 1), 8),
    seed: Number.isFinite(seed) ? seed : undefined,
    status: 'queued', images: [], createdAt: now(), updatedAt: now(),
    leased: false, leasedAt: null, errorMessage: null
  });
  imageQueue.push(id);
  res.json({ jobId: id });
});

router.get('/api/image-jobs/:id', (req, res) => {
  const j = imageJobs.get(req.params.id);
  if (!j) return res.status(404).json({ error: 'Not found' });
  res.json({ id: j.id, status: j.status, images: j.images, errorMessage: j.errorMessage });
});

// ---------- PUBLIC: Image -> 3D ----------
router.post('/api/image-to-3d', (req, res) => {
  const { imageUrl, seed } = req.body || {};
  if (!imageUrl || typeof imageUrl !== 'string') return res.status(400).json({ error: 'Missing imageUrl' });
  const id = makeId('i23d');
  threeJobs.set(id, {
    id, imageUrl, seed: Number.isFinite(seed) ? seed : undefined,
    status: 'queued', result: null, errorMessage: null,
    leased: false, leasedAt: null, createdAt: now(), updatedAt: now(),
  });
  threeQueue.push(id);
  res.json({ jobId: id });
});

router.get('/api/jobs/:id', (req, res) => {
  const j = threeJobs.get(req.params.id);
  if (!j) return res.status(404).json({ error: 'Not found' });
  res.json({ id: j.id, status: j.status, result: j.result, errorMessage: j.errorMessage });
});

// ---------- INTERNAL (workers) ----------
// image worker
router.post('/internal/image-jobs/lease', (_req, res) => {
  const j = lease(imageQueue, imageJobs);
  if (!j) return res.status(204).end();
  res.json({ id: j.id, prompt: j.prompt, candidates: j.candidates, seed: j.seed });
});
router.patch('/internal/image-jobs/:id', (req, res) => {
  const j = imageJobs.get(req.params.id);
  if (!j) return res.status(404).json({ error: 'Not found' });
  const { status, images, errorMessage } = req.body || {};
  if (status === 'done') { j.status = 'done'; j.images = Array.isArray(images) ? images : []; j.errorMessage = null; }
  else if (status === 'error') { j.status = 'error'; j.errorMessage = errorMessage || 'Unknown error'; }
  else return res.status(400).json({ error: 'Invalid status' });
  j.leased = false; j.leasedAt = null; j.updatedAt = now(); imageJobs.set(j.id, j); res.json({ ok: true });
});

// 3D worker
router.post('/internal/three-jobs/lease', (_req, res) => {
  const j = lease(threeQueue, threeJobs);
  if (!j) return res.status(204).end();
  res.json({ id: j.id, imageUrl: j.imageUrl, seed: j.seed });
});
router.patch('/internal/three-jobs/:id', (req, res) => {
  const j = threeJobs.get(req.params.id);
  if (!j) return res.status(404).json({ error: 'Not found' });
  const { status, result, errorMessage } = req.body || {};
  if (status === 'done') {
    if (!result || !result.glbUrl) return res.status(400).json({ error: 'Missing result.glbUrl' });
    j.status = 'done'; j.result = result; j.errorMessage = null;
  } else if (status === 'error') {
    j.status = 'error'; j.errorMessage = errorMessage || 'Unknown error';
  } else return res.status(400).json({ error: 'Invalid status' });
  j.leased = false; j.leasedAt = null; j.updatedAt = now(); threeJobs.set(j.id, j); res.json({ ok: true });
});

module.exports = router;
