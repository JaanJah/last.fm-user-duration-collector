# Last.fm User Duration Collector

This project is written to run on [Deno](https://deno.land).

```bash
# Copy and configure env variables
cp .env.example .env
# Start docker services
docker-compose up -d
# Run database migrations
deno task migrate:up
# Rollback database migrations
deno task migrate:down
# Setup githooks
deno run -A -r https://deno.land/x/githooks/githooks.ts
# Run project
deno task start
# Format files
deno task lint
# Create database migration
deno task migrate:make <name>
```
