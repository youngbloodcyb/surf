# Surf Finder

![CleanShot 2025-01-02 at 01 28 12@2x](https://github.com/user-attachments/assets/1f9409ff-d970-4087-8e37-c3b24ba21608)

Surf Finder is a web app that helps you find the best spots for surfing.

## Overview

Surf Finder is inspired by the [Surfline](https://surfline.com) website. It provides an AI chat interface to get information about surf conditions in San Diego County, CA. It also includes a blog, surf spot directory, and news updates. An adapted version of [SurfPy](https://github.com/mpiannucci/surfpy) python project is used to fetch and process buoy and forecast info from [NOAA](https://www.noaa.gov/) to give wave information. Surf Finder is built with Next.js and hosted on Vercel.

Notable features:

- Mixes 2 runtimes in the same project and deployment on Vercel — Python and Node.js
- Uses a headless CMS (WordPress) in combination with Vercel/Next features such as ISR & SSG
- Directory content and comments make use of PPR and Vercel Postgres (Neon DB provider)
- AI chat uses Vercel AI SDK with RSC to stream UI components
- Vercel CRON triggers are used to pull news updates from Surfline each day

## Performance

Every page returns a desktop performance score of 97-100 on Google PageSpeed Insights. Mobile scores are all 90+.

![CleanShot 2025-01-02 at 01 03 37@2x](https://github.com/user-attachments/assets/c37fa0e3-41d2-488f-8853-ea401fdd6157)

## Architecture Overview

![CleanShot 2025-01-02 at 01 23 46@2x](https://github.com/user-attachments/assets/55fd4d24-7178-4249-87c9-0b172c8e5de0)

## Tech Stack / Features

- Next.js 15
- Serverless Functions (Python and Node.js runtimes)
- Server Actions
- Vercel AI SDK (RSC) — including generative UI
- Incremental Static Regeneration
- Partial Prerendering
- Static Site Generation
- Vercel CRON Jobs
- Vercel Postgres (using Neon DB provider)
- Headless CMS (WordPress)
- Vercel Draft Mode (for previewing blog post changes)
- TailwindCSS
- shadcn/ui
- several other dependencies (motion, animations, etc.)

## Routes

This project uses a variety of rendering strategies for max performance. Blog posts are statically generated and use ISR for updates. Surf spot directory pages take advantage of PPR and have statically pre-rendered content with a dynamic comment section. The chat page uses RSC to generate UI with AI and uses server actions to handle the chat logic. News updates are statically generated and use a Vercel CRON job to update each day.

Route (app)  
┌ ○ /  
├ ○ /\_not-found  
├ ƒ /api/news  
├ ○ /chat  
├ ○ /news  
├ ƒ /posts  
├ ● /posts/[slug]  
├ ├ /posts/history-of-surfing [+more paths]
├ ○ /spots  
└ ◐ /spots/[slug]  
 └ /spots/[slug]

○ (Static) prerendered as static content
● (SSG) prerendered as static HTML (uses generateStaticParams)
◐ (Partial Prerender) prerendered as static HTML with dynamic server-streamed content
ƒ (Dynamic) server-rendered on demand

## App Screenshots

### Chat interface

Ask questions about current surf for specific locations (data only available for a few locations currently). 

![CleanShot 2025-01-02 at 09 06 15@2x](https://github.com/user-attachments/assets/7b467236-562e-434f-8a71-c0c3ae9d797d)

![CleanShot 2025-01-02 at 09 07 27@2x](https://github.com/user-attachments/assets/40e3b4e6-aca6-485a-92fe-adeef67dfca0)

![CleanShot 2025-01-02 at 09 08 17@2x](https://github.com/user-attachments/assets/0ece6d61-1c94-4b9f-a4b0-afd482a8c065)

### Surf Spots

A static directory of surf spots around the world.

![CleanShot 2025-01-02 at 09 08 47@2x](https://github.com/user-attachments/assets/bef6d4da-df90-4425-822e-c20d0c5b70d5)

Uses partial prerendering to mix static and dynamic content on a page.

![CleanShot 2025-01-02 at 09 09 19@2x](https://github.com/user-attachments/assets/12ae6f49-52e5-4995-9372-ea8a8fe9fcf0)

### Blog

Static blog with dynamic server-side rendered filtering.

![CleanShot 2025-01-02 at 09 10 20@2x](https://github.com/user-attachments/assets/a0b8c175-96dd-4501-a9eb-787c4f14ecf8)


built by [cameron youngblood](https://cameron.so)
