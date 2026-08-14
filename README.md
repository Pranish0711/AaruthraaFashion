# AaruthraaFashion — B2B Wholesale Apparel Platform

Premium wholesale and custom apparel website built with Next.js, PostgreSQL (Neon), Prisma, NextAuth, and Cloudinary.

## Features

- Public marketing site with product catalogue, customization flow, and bulk quote requests
- WhatsApp integration with context-aware pre-filled messages
- Admin dashboard with product, category, enquiry, and customer management
- Cloudinary image uploads for products and customer design files
- Secure admin authentication with bcrypt-hashed passwords

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + Radix UI components
- **Framer Motion** animations
- **Neon PostgreSQL** + Prisma ORM
- **NextAuth.js v5** (Credentials provider)
- **Cloudinary** for image storage

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `AUTH_SECRET` | Random secret (32+ chars). Generate: `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Initial admin email (used during seed) |
| `ADMIN_PASSWORD` | Initial admin password (hashed in DB during seed) |
| `WHATSAPP_NUMBER` | E.164 without + (e.g. `917871317044`) |
| `CLOUDINARY_*` | Cloudinary credentials for image uploads |
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO metadata |

### 3. Set up Neon database

1. Create a free database at [neon.tech](https://neon.tech)
2. Copy the connection string to `DATABASE_URL` in `.env`

### 4. Push schema and seed

```bash
npm run db:push
npm run db:seed
```

This creates the admin user, categories, 12 sample products, and site settings.

### 5. Run development server

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

Default admin credentials (from `.env`):
- Email: `admin@aaruthraafashion.in`
- Password: `admin@aaruthraafashion`

Change the password in Admin → Settings after first login.

## Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy — Vercel runs `prisma generate` via postinstall
5. Run `npm run db:push && npm run db:seed` against your production Neon DB once

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Marketing pages
│   ├── admin/             # Admin dashboard
│   └── api/auth/          # NextAuth routes
├── actions/               # Server actions
├── components/
│   ├── admin/
│   ├── forms/
│   ├── public/
│   └── ui/
└── lib/                   # Utilities, auth, prisma, cloudinary
prisma/
├── schema.prisma
└── seed.ts
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |
