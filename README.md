# NESTA

NESTA is a React/Vite real estate marketplace frontend with an Express API and PostgreSQL persistence.

## Requirements

- Node.js 20 or newer
- PostgreSQL 14 or newer

## Install

```sh
npm install
npm --prefix server install
```

## Configure the database

Copy `.env.example` to `.env`, then set `DATABASE_URL` to a PostgreSQL database you control. Never commit `.env` or expose its values to the frontend.

```sh
cp .env.example .env
```

Then create and generate the initial schema:

```sh
npm --prefix server run prisma:generate
npm --prefix server run prisma:migrate -- --name init
npm --prefix server run prisma:seed
```

The seed script imports the existing fictional Ghana property listings and agents. It creates agent emails on the reserved local-only `nesta.local` domain with random unusable passwords.

## Run locally

Start the API and frontend in separate terminals from the project root:

```sh
npm run dev:server
npm run dev
```

Vite proxies `/api` to `http://localhost:4000`. You can override `PORT` and `FRONTEND_URL` in `.env`. For production, serve the frontend and API over HTTPS so the session cookie is Secure.

## API

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET /api/properties`, `GET /api/properties/:id`, `GET /api/properties/mine`, `POST /api/properties`, `PUT /api/properties/:id`, `DELETE /api/properties/:id`
- `GET /api/favorites`, `POST /api/favorites/:propertyId`, `DELETE /api/favorites/:propertyId`
- `POST /api/inquiries`, `GET /api/inquiries`
- `POST /api/viewings`, `GET /api/viewings`
- `GET /api/users/me`, `PUT /api/users/me`, `GET /api/users` (admin), `PUT /api/users/:id/role` (admin), `DELETE /api/users/:id` (admin), `GET /api/agents/:id`

Property listing supports `location`, `transactionType`, `propertyType`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`, `amenity`, `query`, `sort`, `page`, and `limit` query parameters. Responses include pagination metadata.

## Current integration limits

- Listing photos are accepted as URLs. The existing file picker remains a visual affordance; server-side image uploads/storage are not configured.
- Recently viewed and property comparisons remain browser-local features.
- The agent listing table, buyer inquiry/viewing pages, profile updates, listing deletion, listing edits, and agent overview metrics are connected to the API. Recently viewed properties and property comparisons remain browser-local features.
- CORS is restricted to the configured frontend origin; cookie-based cross-site production deployment may require a same-site deployment or a deliberate SameSite=None + HTTPS configuration with CSRF protection.
