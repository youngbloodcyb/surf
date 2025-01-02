# Surf Finder

![CleanShot 2025-01-02 at 01 28 12@2x](https://github.com/user-attachments/assets/1f9409ff-d970-4087-8e37-c3b24ba21608)

Surf Finder is a web app that helps you find the best spots for surfing.

## Overview

Surf Finder is inspired by the [Surfline](https://surfline.com) website. It provides an AI chat interface to get information about surf conditions in San Diego County, CA. It also includes a blog, surf spot directory, and news updates.

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

built by [cameron youngblood](https://cameron.so)
