# Svearch

A simple search engine built with SvelteKit,
powered by the [Mwmbl](https://mwmbl.org) search API.
Type a query and get web results.

## How It Works

1. You enter a query
2. Svearch sends it to the Mwmbl API
3. The results are displayed on the page
4. The results are also cached in localStorage to reduce API calls
   for repeat queries[^1]

[^1]: Only 10 most recent searches are cached

## Getting Started

You'll need [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io/installation).

```bash
git clone https://github.com/israjatiangar/svearch.git
cd svearch
pnpm install
pnpm dev
```

## Tech Stack

- SvelteKit
- TypeScript
- Tailwind CSS
- daisyUI
- Mwmbl API

## API Credits

Search results are provided by [Mwmbl](https://github.com/mwmbl/mwmbl),
an open source search engine.

---

Made with ❤️ by
[Rajat Iangar](https://github.com/israjatiangar 'My Github Profile') \
`🤖 used for readme only `
