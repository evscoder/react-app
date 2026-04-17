## Quick Start

Create local environment file:

```bash
cp .env.example .env
```

Run development containers:

```bash
make docker-up
```

Open the app:

```text
http://localhost:4200
```

Check the API:

```bash
curl http://localhost:3001/api/health
```

Stop development containers:

```bash
make docker-down
```

## Production Preview

Run production preview containers:

```bash
make docker-up-prod
```

Check the app and API through the frontend preview server:

```bash
curl http://localhost:4200/api/health
```

Stop production preview containers:

```bash
docker compose -f docker-compose.prod.yml down
```
