# Deploying to Heroku

## One-time setup

Heroku skips `devDependencies` by default, but this app needs them to build (Vite, TypeScript). Set:

```bash
heroku config:set NPM_CONFIG_PRODUCTION=false -a YOUR_APP_NAME
```

Replace `YOUR_APP_NAME` with your Heroku app name.

## Deploy

```bash
git push heroku main
```

## What runs on Heroku

1. **Build** (`heroku-postbuild`): `npm run build` → produces `dist/`
2. **Start** (Procfile): `npm start` → `serve -s dist -l $PORT` (serves the SPA)

## If the app still doesn’t open

- In Heroku Dashboard: **More** → **View logs**, and check for build or runtime errors.
- Confirm the app uses the **Node.js** buildpack.
- After changing `NPM_CONFIG_PRODUCTION`, trigger a new deploy: **Deploy** → **Deploy branch** (or push again).
