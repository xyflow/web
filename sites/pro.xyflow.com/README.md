# React Flow Platform

Our platform for managing React Flow Pro subscriptions. Built with [nextjs](https://nextjs.org/), [nhost](https://nhost.io/) and [stripe](https://stripe.com).

## App Structure

- [NextJS App Router](https://nextjs.org/docs/app/building-your-application/routing)
- nhost backend is located in the /nhost directory

## Development

**@todo use pnpm instead of npm**
**@todo add more detailed instructions on how to run the app locally**

To run the platform locally, you need to prepare your local environment to run stripe and nhost:

- without stripe and nhost (e.g. for editing public pages)
- with nhost auth (e.g. for working on the dashboard pages)
- with stripe (e.g. for working on the payment system)

## Staging

- the `staging` branch is automatically deployed to the staging environment

## Production

- the `main` branch is automatically deployed to production

## Environment Variables

- .secrets needs to contain all environment variables needed for the nhost backend
  - STRIPE_SECRET_KEY
  - STRIPE_WEBHOOK_SECRET
  - MAILJET_APIKEY_PRIVATE
  - MAILJET_APIKEY_PUBLIC
  - DISCORD_SUBSCRIPTIONS_WEBHOOK
- .env.development and .env.production contain environment variables to run the frontend
  - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  - NEXT_PUBLIC_NHOST_SUBDOMAIN
  - NEXT_PUBLIC_NHOST_REGION

<!-- To run the platform locally, you need to prepare your local environment to run stripe and nhost:

1. Clone this repository
2. Add .env.development.local and .env.production.local files containing the following entries: `NHOST_ADMIN_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
3. Install the nhost CLI (https://docs.nhost.io/get-started/cli-workflow/install-cli)
4. Clone the backend repository: xyflow/react-flow-nhost
5. Inside the backend repository, run `nhost dev` (in one terminal)
6. Install the stripe CLI: https://stripe.com/docs/stripe-cli
7. In another terminal, run `stripe login` and `stripe listen --forward-to localhost:3000/api/stripe/webhook` (this will also print the STRIPE_WEBHOOK_SECRET for your .env.development.local file)
8. Now you have nhost and stripe running locally to test everything
9. Inside the nextjs app, run `npm install` and `npm run dev`
10. For testing the stripe integration, you can run `stripe trigger [some-event]`. You get the full list of events by running `stripe trigger --help` -->
