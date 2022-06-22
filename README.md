This Project uses `yarn`

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Docker

issues with postgres database? reset it
if you need to reset:

- `docker-compose down`
- `docker volume prune`
- `docker-compose up -d`

## Backend Seeding

- make sure that you have installed all the dependencies (yarn)
- run Docker Desktop by 'docker-compose up'
- start the development server (yarn dev)
- run 'yarn db:push' to sync the database
- run 'yarn prisma db seed' to seed the database

- npx prisma generate

## The next-auth issue

short: u got node 17 but u need node 16
long:

- run "volta" in terminal
- command not found?
- Find out how you installed node.
  also check if you installed yarn with the same tool
  MacUsers: maybe homebrew
  Windows: ???
- mac: brew remove node
- go to https://volta.sh/ and run "curl https://get.volta.sh | bash"
- "volta install node"
  optional: "volta install yarn"

## The db:push issue

- your env file needs to be .env, not .env.local
- npx prisma generate
- yarn db:push
