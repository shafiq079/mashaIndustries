// backend/utils/cache.js
const NodeCache = require('node-cache');

// Create a new cache instance with a standard TTL of 10 minutes (600 seconds)
// and a checkperiod of 2 minutes (120 seconds) to automatically remove expired items.
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = cache;
