# remote1 (Next.js Module Federation Remote)

This app is a **Module Federation remote** built with Next.js.
It exposes the `DashboardApp` component for host applications.

## Getting Started

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production build:

```bash
npm run start
```

Run lint:

```bash
npm run lint
```

## Federation Details

- Remote name: `remote1`
- Remote entry file: `static/chunks/remoteEntry.js`
- Exposed module: `./DashboardApp` -> `./src/components/DashboardApp`
- Shared singleton deps: `react`, `react-dom`

## Strict Rules (Must Follow)

These rules are mandatory for this remote app:

- **Node.js**: Use only Node **18** or **20** (LTS).
- **Next.js version**: Keep Next.js at **15.x**. Do **not** upgrade beyond v15.
- **React version**: Keep **React and ReactDOM on 18.x** (current setup: `^18.2.0`) and keep both versions aligned.
- **Bundler mode**: Use **Webpack mode only** (no Turbopack). Keep `NEXT_PRIVATE_LOCAL_WEBPACK=true` in scripts.
- **Routing system**: Keep this app on the **Pages Router**. Do not migrate this remote to App Router.
- **Federation sharing**: Configure shared packages correctly (especially **React/ReactDOM as singletons**) to avoid duplicate runtimes.
- **Remote contract discipline**: Version remote changes carefully and keep host/remote APIs backward-compatible.
- **Failure handling**: Always provide fallback UI/error handling when a remote fails to load.

## Local URL

By default, app runs on:

- `http://localhost:3000`

Remote entry (when running):

- `http://localhost:3000/_next/static/chunks/remoteEntry.js`
