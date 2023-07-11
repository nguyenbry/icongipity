# Object GiPiTy

This is a generative-art app that is powered by OpenAI. You sign up, give it some prompts, select a few options, and get back generated images for your "object".

The app is fully typesafe and provides an unmatched developer experience.

## Technologies

- OpenAI DALLE2
- AWS S3
- Typescript
- Shadcn UI (a component library, but you dont have to cry trying to customize things)
- tRPC
- Clerk (authentication provider)
- Planetscale (managed MySQL)
- Prisma (typesafe db queries)

## Motivation

As of late, it's hard to go on Twitter and not see something related to AI. I wanted to make a project that uses at least a little bit of it, so I came up with this very simple idea to generate "objects" after seeing [this](https://twitter.com/0xCharlota/status/1543868135861805056) tweet. On top of this, the web dev space is growing quickly and there are tons of packages out that provide insanely great developer experience.

I wanted to combine a few of favorite technologies and do something cool. Not having to roll your own authentication by using Clerk lets you set up auth in minutes. Syncing your database schema with Prisma means you get typesafe data. Add tRPC to the mix and now your frontend can also see and your data typings. It's hard to beat.

## Gotcha

If you want to clone this repo and deploy it to Vercel, you probably need the Pro plan. The reason being that the route that handles generating the image then storing it in AWS takes a little long, as you can imagine. Vercel times out any serverless invokations after 10 seconds, but you get a little bit more time with the Pro plan. Deploying the project as standalone probably will not suffer from this issue.
