
# YMovies

YMovies is an application for searching and viewing information about popular movies, built with Next.js and TypeScript.

## Features
- View popular movies from TMDB
- Search movies by title
- Movie detail page
- Modern UI (shadcn/ui, Tailwind CSS)
- Loading and skeleton screens

## Technologies
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- TMDB API

## Quick Start

1. Clone the repository:
	```bash
	git clone https://github.com/ComradeUa/Ymove.git
	cd Ymove
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Create a `.env.local` file and add your TMDB API key:
	```env
	MOVIES_API_KEY=your_key
	```
4. Start the project:
	```bash
	npm run dev
	```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure
- `src/app` — application pages
- `src/components` — UI components
- `src/hooks` — custom hooks
- `src/services/api` — API logic
- `src/types` — TypeScript types

## License
MIT

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
