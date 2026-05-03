Practice 2 — The API Response Normalizer

# Context: Your app consumes 3 third-party APIs (a payment provider, a shipping service, and a CRM). Each returns wildly different response shapes, error formats, and status codes.

# Problem: Your frontend components are full of if (provider === 'stripe') guards. Design a layer that unifies all three into a single predictable response contract, so UI components never know which provider they're talking to — and swapping one out requires changing only one file.

# My Solution: the keywords: different response shapes and unifying layer led me to know that the right Design Pattern in this situation is the Adaptor. it's the one which translates different languages -third party APIs- into my languages -what I'm building-.

# Features:
    - I want the unified response shape to be {success:true, statusCode:number, data:any } | {success:false, statusCode:number, error:string}
