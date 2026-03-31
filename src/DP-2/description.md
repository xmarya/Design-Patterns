Practice 2 — The API Response Normalizer
# Context: Your Next.js app consumes 3 third-party APIs (a payment provider, a shipping service, and a CRM). Each returns wildly different response shapes, error formats, and status codes.

# Problem: Your frontend components are full of if (provider === 'stripe') guards. Design a layer that unifies all three into a single predictable response contract, so UI components never know which provider they're talking to — and swapping one out requires changing only one file.