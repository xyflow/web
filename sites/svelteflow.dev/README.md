## React Flow Website

This folder contains the source code of the [Svelte Flow website](https://svelteflow.dev).
It is built with [nextra](https://nextra.site/), [nhost](https://nhost.io/) and
[stripe](http://stripe.com/).

### Environment Variables

With the defaults in `.env`, you are able to run the website locally. If you want to test
the pro examples, you need to make a copy of `.env.local.example` to `.env.local` and fill
in the values.

Additionally, we set these env variables on vercel for preview and production:

```
NEXT_PUBLIC_NHOST_SUBDOMAIN
NEXT_PUBLIC_NHOST_REGION
NEXT_PUBLIC_PRO_EXAMPLES_URL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

### Installation

```
$ pnpm install
```

### Development

```
$ pnpm run dev
```

### Build

```
$ pnpm build
```
