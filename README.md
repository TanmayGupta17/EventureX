# EventureX
EventureX is a full-stack event and attendee management portal built with Next.js, Prisma, React Hook Form, TanStack Query, and Shadcn/UI. It allows users to create, view, and manage events, as well as register attendees for specific events.

## Features
- **Event Management:** Create, view, and manage events with title, date, description, and capacity.
- **Attendee Registration:** Register attendees for events with name and email, and view attendee lists per event.
- **Relational Data:** Uses Prisma ORM for robust data relationships and persistence.
- **Form Validation:** React Hook Form and Zod for schema validation and form integrity.
- **State Management:** TanStack Query for server-state synchronization and caching.
- **Professional UI:** Shadcn/UI components, responsive dialogs, skeletons, and error boundaries.
- **Optimistic UI & Feedback:** Toast notifications and immediate UI updates for a smooth user experience.

## Tech Stack
- Next.js (App Router)
- Prisma ORM
- PostgreSQL
- React Hook Form
- Zod
- TanStack Query
- Shadcn/UI
- Tailwind CSS

## How to Run
1. Clone the repository:
	```sh
	git clone git@github.com:TanmayGupta17/EventureX.git
	cd EventureX
	```
2. Install dependencies:
	```sh
	npm install
	```
3. Set up your `.env` file with your database connection string:
	```env
	DATABASE_URL=your_postgres_connection_string
	```
4. Run Prisma migrations and generate client:
	```sh
	npx prisma migrate dev
	npx prisma generate
	```
5. Start the development server:
	```sh
	npm run dev
	```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` - Next.js app pages and layout
- `components/ui/` - UI components (EventList, Dialog, EventForm, etc.)
- `lib/` - Prisma client and utility functions
- `prisma/` - Prisma schema and migrations
- `public/` - Static assets

## Assignment Notes
- All core and advanced requirements are implemented.
- UI is professional, responsive, and user-friendly.
- Code is modular and follows best practices.
- See `/register` page for attendee registration and main dashboard for event management.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
