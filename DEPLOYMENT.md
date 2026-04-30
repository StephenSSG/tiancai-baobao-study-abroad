# Deployment Checklist

## Stack

- Hosting: Vercel
- Database: Supabase Postgres
- Email notification: Resend
- Domain: `study.tiancaibaobao.com`

## Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy these values for Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

Use the service role key only in Vercel environment variables. Do not put it in frontend code.

## Resend

1. Create a Resend API key.
2. Verify the sending domain before production email.
3. Set `RESEND_FROM_EMAIL`, for example `天财保宝 <consult@mail.tiancaibaobao.com>`.
4. Set `LEAD_NOTIFY_EMAIL` to `yi7710812@gmail.com`.

## Vercel Environment Variables

Add these in Vercel Project Settings:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_LEADS_TABLE=leads
RESEND_API_KEY=
RESEND_FROM_EMAIL=天财保宝 <consult@mail.tiancaibaobao.com>
LEAD_NOTIFY_EMAIL=yi7710812@gmail.com
```

## Vercel Build Settings

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Domain

Add `study.tiancaibaobao.com` in Vercel Domains.

Then add the DNS record requested by Vercel at your domain provider. It is usually a CNAME from `study` to Vercel's target.

Use a separate subdomain such as `mail.tiancaibaobao.com` for Resend sending records so the website CNAME and email DNS records do not conflict.

## References

- Vercel custom domains: https://vercel.com/docs/domains/set-up-custom-domain
- Supabase row level security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Resend domain setup: https://resend.com/docs/dashboard/domains/introduction
