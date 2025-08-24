import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './masha_industries';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 text-slate-600">
      {/* Container */}
      <div className="container mx-auto px-5 py-12">
        {/* Top content */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center">
              <Logo w={90} h={60} />
              <span className="ml-3 text-xl font-semibold text-slate-900">MashaIndustries</span>
            </Link>
            <p className="mt-3 text-sm">
              Innovative, custom apparel powered by technology and craftsmanship.
            </p>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500 hover:text-red-600 hover:ring-red-200 transition"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500 hover:text-red-600 hover:ring-red-200 transition"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500 hover:text-red-600 hover:ring-red-200 transition"
              >
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 text-slate-500 hover:text-red-600 hover:ring-red-200 transition"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM7.5 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.73-2.46C21.4 7.74 24 10 24 14.11V24h-5v-8.58c0-2.05-.04-4.69-2.86-4.69-2.86 0-3.3 2.23-3.3 4.53V24h-5V8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="hover:text-red-600 transition-colors text-sm">About Us</Link></li>
              <li><a href="/careers" className="hover:text-red-600 transition-colors text-sm">Careers</a></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors text-sm">Contact Us</Link></li>
              <li><a href="/blog" className="hover:text-red-600 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Customer Service</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/faq" className="hover:text-red-600 transition-colors text-sm">FAQ</a></li>
              <li><a href="/shipping" className="hover:text-red-600 transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="/track-order" className="hover:text-red-600 transition-colors text-sm">Track Order</a></li>
              <li><a href="/support" className="hover:text-red-600 transition-colors text-sm">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Stay Connected</h3>
            <p className="mt-4 text-sm">Subscribe to our newsletter</p>
            <form
              className="mt-3 flex max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-l-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              />
              <button
                type="submit"
                className="rounded-r-full bg-red-600 px-5 py-2 text-white text-sm font-medium hover:bg-red-700 transition"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-slate-500">
              By subscribing, you agree to our <a href="/privacy" className="underline hover:text-red-600">Privacy Policy</a>.
            </p>
          </div>
        </div>

        {/* Bottom row (no border line) */}
        <div className="mt-10 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm">
          <p>© {year} MashaIndustries. All Rights Reserved.</p>
          <nav className="flex flex-wrap gap-6">
            <a href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-red-600 transition-colors">Terms & Conditions</a>
            <a
              href="https://shafiq-webdev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors"
            >
              Developed by Shafiq
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
