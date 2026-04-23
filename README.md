# ReplyNow

Every Google review, answered overnight.

**Status:** v0 skeleton — landing page + review-reply demo route. Full AI not yet wired.

**Landing:** https://replynow.vercel.app

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 |
| Fonts | Inter via `next/font/google` |
| Hosting | Vercel (zero config) |
| Waitlist | https://waitlist-api-sigma.vercel.app |

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Deploy

Push to `main` — Vercel picks it up automatically. No environment variables required.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page (original copy + design preserved) |
| `/try` | Paste a Google review → 3 mocked response drafts (warm, professional, apology-if-negative) |
| `/api/waitlist` | `POST { email, product: "replynow" }` → forwards to waitlist-api-sigma |

## What's next

- Wire real AI (review reply generation) behind `/try`
- Connect Google Business Profile API for automatic review monitoring
- Auth + per-business dashboard
