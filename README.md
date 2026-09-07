# Divya Tara Enterprises — Next.js

Converted from the Hostinger Horizons export into a Next.js App Router application.

## What the original site used

- React with JavaScript/JSX
- Vite build tooling
- Tailwind CSS and component libraries
- React Router for page routing
- PocketBase for authentication, enquiries and farmer stories

## What this version uses

- Next.js 16 with TypeScript and the App Router
- MongoDB/Mongoose-ready content and enquiry storage
- Cloudinary-ready image/video uploads
- Signed cookie-based admin login
- Responsive custom CSS

## Run locally

Requires Node.js 20.9 or newer.

1. Copy `.env.example` to `.env.local`.
2. Add a secure admin session secret. MongoDB and Cloudinary can be added later.
3. Run `npm install`.
4. Run `npm run dev`.

Run `npm run seed` once to copy the bundled tractor models and farmer stories into MongoDB. The command is idempotent and updates matching records without creating duplicates.

The website works with the migrated seed content when MongoDB is not configured. Database writes and form submissions become active after `MONGODB_URI` is supplied.

## Environment values still needed

- `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`

## Hostinger

Deploy as a Node.js application, not as a static site. Build with `npm run build` and start with `npm run start`. Configure all values from `.env.example` in Hostinger's environment settings.
