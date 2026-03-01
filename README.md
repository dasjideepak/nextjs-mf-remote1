# remote1 (Next.js Module Federation Remote)

This app is a **Module Federation remote** built with Next.js.
It exposes the `DashboardShell` module for host applications.

## Getting Started

Install dependencies:

```bash
npm install
```

## Using private GitHub Packages

This app installs `@dasjideepak/*` packages from GitHub Packages and requires auth.

### 1) Generate a GitHub token

Create a Personal Access Token (classic):

1. GitHub -> `Settings` -> `Developer settings` -> `Personal access tokens` -> `Tokens (classic)`
2. Click `Generate new token (classic)`
3. Select scopes:
   - `read:packages` (required to install private packages)
   - `repo` (required when package/repository is private)
   - `write:packages` (only needed for publishing)
4. Copy and store the token securely.

### 2) Configure local auth

This repo expects:

- `GITHUB_PACKAGES_TOKEN`

This app's `.npmrc` uses it:

```ini
@dasjideepak:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Set token before install:

```bash
export GITHUB_PACKAGES_TOKEN=ghp_xxx_your_token_here
npm install
```

### 3) Configure in Vercel

In Vercel project settings for `remote1`:

1. Go to `Settings` -> `Environment Variables`
2. Add `GITHUB_PACKAGES_TOKEN`
3. Apply to `Production`, `Preview`, and `Development` as needed
4. Redeploy to apply changes

### 4) Security notes

- Never commit tokens to Git.
- Rotate token immediately if exposed.
- Use least privilege (`read:packages` + `repo` for consumers).

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
- Exposed module: `./DashboardShell` -> `./src/components/DashboardShell`
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
