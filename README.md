# Fix My Formatting

Fast, static-first browser tools for cleaning and converting text copied from AI products.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The tools work without environment variables. Share links require:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SHARE_HASH_SALT`

Apply `supabase/migrations/001_share_system.sql` to the Supabase project before enabling sharing.

## Verification

```bash
npm run lint
npm test
npm run build:checked
```

## Add a tool

1. Add one `ToolDefinition` entry in `src/lib/tools.ts`.
2. Add its processing branch in `src/lib/processors.ts`.
3. Add fixture assertions in `tests/processors.test.ts`.

The dynamic tool route generates the page, metadata, schema, sitemap entry, navigation, related links, embed, and share UI automatically.

## Deploy

Import the repository into Vercel, add the three environment variables, and use the default Next.js build settings. The production domain is `fixmyformatting.com`.
