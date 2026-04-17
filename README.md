## Quick Start

```bash
git clone git@github.com:evscoder/react-app.git my-new-project
cd my-new-project
rm -rf .git
git init
cp .env.example .env
git add .
git commit -m "Initial project from template"
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
