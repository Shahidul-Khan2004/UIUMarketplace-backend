# UIU Marketplace Backend

Backend API for UIU Marketplace.

## Prerequisites

- Node.js 18+ (or newer)
- npm
- Docker + Docker Compose

## 1) Clone and install dependencies

```bash
git clone https://github.com/Shahidul-Khan2004/UIUMarketplace-backend.git
cd UIUMarketplace-backend
npm install
```

## 2) Configure environment variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Default `.env.example` values:

```dotenv
PORT=8080
POSTGRES_USER=User
POSTGRES_PASSWORD=Password
POSTGRES_DB=DatabaseName
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}
```

Update these values as needed. `docker-compose.yml` uses `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`.

## 3) Start PostgreSQL with Docker

```bash
sudo docker compose up -d
```

This starts a PostgreSQL container on `localhost:5432` and auto-runs the SQL schema from:

- `src/schemas/schema.sql`

To stop the database:

```bash
sudo docker compose down
```

## 4) Run the backend server

```bash
node src/app.js
```

Server runs at:

- `http://localhost:8080` (or your `PORT` from `.env`)

## 5) Quick API checks

### Health check

```bash
curl http://localhost:8080/health
```

Expected: JSON with API status and DB time/version.

### Register user

```bash
curl -X POST http://localhost:8080/auth/register \
	-H "Content-Type: application/json" \
	-d '{
		"email": "student@uiu.ac.bd",
		"fullName": "UIU Student",
		"password": "secret123",
		"rePassword": "secret123"
	}'
```

## Notes

- There is currently no `npm start` script in `package.json`; run with `node src/app.js`.
- The app expects PostgreSQL on `localhost:5432`.
- If Docker is already using port `5432`, change the port mapping in `docker-compose.yml`.
