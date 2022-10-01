# Last.fm User Duration Collector

```bash
# Copy and configure env variables
cp .env.example .env
# Start docker services
docker-compose up -d
# Run database migrations
deno run -A --unstable https://deno.land/x/nessie/cli.ts migrate
# Rollback database migrations
deno run -A --unstable https://deno.land/x/nessie/cli.ts rollback
# Run project
deno task start
# Format files
deno task lint
# Create database migration
deno run -A --unstable https://deno.land/x/nessie/cli.ts make:migration <name>
```
