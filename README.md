
# Authentication (MERN)

Full‑stack authentication demo with:

- Frontend: React + Vite
- Backend: Express
- Database: MongoDB (Mongoose)
- Auth: JWT

## Features

- Register and login
- Password hashing with `bcryptjs`
- JWT creation on login
- Basic backend validation (email format, password length)
- React UI pages: Login, Register, Welcome

## Project Structure

Key files/folders:

- `server.js` — Express API entrypoint (runs on port `5050` by default)
- `src/routes/Auth.js` — `/api/auth` routes
- `src/models/User.js` — Mongoose User model
- `src/config/db.js` — MongoDB connection
- `src/api.js` — Axios client (frontend → backend)
- `src/components/*` — Login/Register/Welcome pages

## Environment Variables

This repo currently loads env variables from **`src/.env`** (not the root).

Create the file:

`src/.env`

Example:

```dotenv
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>
JWT_SECRET=change_me_to_a_long_random_string
PORT=5050
```

Important:

- Don’t commit real secrets.
- `JWT_SECRET` is required for login.

## Install

From the `authentication` folder:

```bash
npm install
```

## Run

### Run frontend + backend together (recommended)

```bash
npm run dev:full
```

- Backend starts on `http://localhost:5050`
- Vite starts on `http://localhost:5174` (or the next available port)

### Run only backend

```bash
npm run server
```

### Run only frontend

```bash
npm run client
```

## API

Base URL: `http://localhost:5050/api/auth`

### `POST /register`

Body:

```json
{ "name": "Your Name", "email": "you@example.com", "password": "secret123" }
```

Response:

```json
{ "msg": "User registered" }
```

### `POST /login`

Body:

```json
{ "email": "you@example.com", "password": "secret123" }
```

Response:

```json
{
	"token": "<jwt>",
	"user": { "name": "Your Name", "email": "you@example.com" }
}
```

## Frontend ↔ Backend Notes

- The frontend uses `src/api.js` (Axios) with `baseURL` defaulting to `/api`.
- Vite dev server proxies `/api` → `http://localhost:5050` (configured in `vite.config.js`).

So from the frontend you call:

- `api.post("/auth/login", ...)`
- `api.post("/auth/register", ...)`

and they reach:

- `POST http://localhost:5050/api/auth/login`
- `POST http://localhost:5050/api/auth/register`

## Troubleshooting

### Blank page + console `404 (Not Found)`

- Open the **exact** URL printed by Vite (it may be `5174`, `5175`, etc. if `5173` is busy).

### MongoDB connection errors

- Verify `MONGO_URI` in `src/.env`.
- Ensure your IP is allowed in MongoDB Atlas Network Access.

### JWT errors

- Ensure `JWT_SECRET` exists in `src/.env`.

## Scripts

- `npm run dev` — Vite frontend
- `npm run server` — Express backend
- `npm run dev:full` — runs both with `concurrently`
- `npm run build` — production build (frontend)
- `npm run lint` — ESLint


