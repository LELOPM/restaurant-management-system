# Restaurant Management System, Phase 1 (MVP)
Source of truth: docs/SRS.md. Read the relevant module before implementing it.

Stack: Next.js (App Router, TypeScript), Tailwind, Supabase (Postgres, Auth, Realtime), Zod.

Rules that must never be broken:
- Order lifecycle is fixed: Pending -> Preparing -> Ready -> Completed. Cancelled only before Completed and only with Manager approval (BR-3).
- Void, discount, price change and special/family orders always require Manager password approval (BR-4).
- Activity logs are append-only. No update or delete, for any role (BR-5).
- Selling an item deducts its recipe ingredients from stock. Manual stock changes require a reason (BR-6).
- Enforce role permissions server-side (RLS and route checks), never only in the UI (FR-1.4).
- Build one module at a time. Do not implement features listed as out of scope in SRS section 11.
- RLS policies must use public.current_user_role() and never query profiles directly (causes infinite recursion).
- Browser code uses createBrowserClient, server code and middleware use createServerClient (@supabase/ssr).
- Light theme only: dark text on light backgrounds.
- Keys live in .env.local only. Never hardcode or print them.
