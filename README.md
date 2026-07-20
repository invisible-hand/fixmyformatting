# Fix My Formatting

Fast, static-first browser tools for cleaning and converting text copied from AI products.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The tools work without environment variables. Share links require:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `SHARE_HASH_SALT`

Provision Upstash for Redis through the Vercel Marketplace to inject the Redis variables automatically. Shared results use a 180-day TTL; rate-limit counters expire after one hour.

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

Import the repository into Vercel, connect Upstash for Redis, add `SHARE_HASH_SALT`, and use the default Next.js build settings. The production domain is `fixmyformatting.com`.
