# Docker Deployment

## Prerequisites

- Docker 24+
- Docker Compose (optional)

## Building the Image

```bash
docker build -t aegis-treasury .
```

## Running the Container

```bash
docker run -p 4001:4001 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:4001 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  aegis-treasury
```

## Docker Compose

Create a `docker-compose.yml`:

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "4001:4001"
    environment:
      - NEXT_PUBLIC_APP_URL=http://localhost:4001
      - NEXT_PUBLIC_API_URL=http://api:8000/api
    depends_on:
      - api
    networks:
      - aegis-network

  api:
    image: your-api-image
    ports:
      - "8000:8000"
    networks:
      - aegis-network

networks:
  aegis-network:
    driver: bridge
```

## Dockerfile

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 4001
CMD ["npm", "run", "start"]
```

## Production Notes

- Use a reverse proxy (nginx, Caddy) in front of the container
- Enable health checks in Docker Compose
- Set `NODE_ENV=production` for optimized builds
- Use Docker volumes for persistent data if needed
