# QurbaniHat

A livestock booking marketplace for Qurbani season — browse verified cows, goats and sheep, view detailed listings, and book securely.

**Live URL:** _add your deployed Vercel link here_

## Purpose

QurbaniHat helps families find and book Qurbani animals online instead of visiting a crowded physical haat. Users can browse listed animals with full details (breed, weight, age, price, location), sort by price, and submit a booking request after logging in.

## Features

- Fully responsive layout (mobile, tablet, desktop)
- Home page with hero, featured animals, "how it works", Qurbani tips, and top breeds sections
- All Animals page with price sorting (low→high / high→low) and loading state
- Animal details page with full info and a booking form (name, email, phone, address)
- Authentication with **better-auth**: email/password + Google social login
- Protected routes: booking requires login, `/my-profile` and `/my-profile/update` redirect to login if not authenticated
- My Profile page showing name, photo and email
- Update Info page to change name/photo (`authClient.updateUser`)
- Toast notifications for success/error states (react-hot-toast)
- Custom 404 not-found page
- Entrance animations using **Animate.css**
- Dark, modern-minimal design system (charcoal background, warm amber accent, Fraunces + Inter typefaces)

## Tech stack / npm packages

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- better-auth (email/password + Google OAuth, MongoDB adapter)
- MongoDB (native driver)
- react-hot-toast
- animate.css
- react-icons

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```dotenv
   MONGODB_URI=your_mongodb_connection_string
   BETTER_AUTH_SECRET=your_random_secret
   BETTER_AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Routes

**Public:** `/`, `/animals`, `/animals/[id]`, `/login`, `/register`
**Private (requires login):** `/my-profile`, `/my-profile/update` — booking submission on the animal details page also requires login.

## Deployment notes

- Set all environment variables in your hosting provider's dashboard (Vercel/Render).
- Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain after deploying.
- Add your production and localhost URLs to the Google OAuth Console's authorized redirect URIs: `{BASE_URL}/api/auth/callback/google`.
- Next.js App Router handles client-side routing/refresh correctly out of the box on Vercel; no extra rewrite rules are needed.
