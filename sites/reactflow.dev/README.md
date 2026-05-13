## React Flow Website

This folder contains the source code of the [React Flow website](https://reactflow.dev).
It is built with [nextra](https://nextra.site/), [nhost](https://nhost.io/) and
[stripe](http://stripe.com/).

### Environment Variables

With the defaults in `.env`, you are able to run the website locally. If you want to test
the pro examples, you need to make a copy of `.env.local.example` to `.env.local` and fill
in the values.

All environment variables in `.env` and `.env.local` are set on vercel for preview and
production.

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
