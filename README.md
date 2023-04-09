# oneramp

### Setting up Auth0

1. Create an account on Auth0 and create an app
2. Install ```bash npm install @auth0/nextjs-auth0```
3. Create a `.env.local` file and add your app creds

```bash
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL=''
AUTH0_CLIENT_ID=''
AUTH0_CLIENT_SECRET=
```

> To create the AUTH0_SECRET key variable, type `openssl rand -hex 32` in your terminal and press enter

4. Under your application settings > Application URIs  / Allowed callback URIs / **add this exact URI** > `http://localhost:3000/api/auth/callback` and under / Allowed Web origins / **add this exact URI** > `http://localhost:3000`

You can follow the full application setup at Auth0 docs under Applications / < Your application > / Quick start / Next JS
