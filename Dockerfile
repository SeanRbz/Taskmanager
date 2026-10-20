# syntax=docker/dockerfile:1.7
#
# Targets
#   web  (default) Production image: nginx serving the static Expo web export on :8080
#   dev            Expo dev server (Metro) on :8081 for Expo Go / web with live reload
#   test           Typecheck, lint and unit tests — `docker compose run --rm test`

ARG NODE_VERSION=22

# ─── Base ─────────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app
ENV EXPO_NO_TELEMETRY=1

# ─── Dependencies (layer cached until the lockfile changes) ───────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ─── Development ──────────────────────────────────────────────────────────────
FROM deps AS dev
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
COPY . .
EXPOSE 8081
CMD ["npx", "expo", "start", "--lan", "--port", "8081"]

# ─── Test / CI ────────────────────────────────────────────────────────────────
FROM deps AS test
ENV CI=1
COPY . .
CMD ["npm", "run", "check"]

# ─── Build: static web export ─────────────────────────────────────────────────
FROM deps AS build
ARG EXPO_PUBLIC_MOCK_API_LATENCY_MS=300
ARG EXPO_PUBLIC_MOCK_API_FAILURE_RATE=0
ENV CI=1 \
    NODE_ENV=production \
    EXPO_PUBLIC_MOCK_API_LATENCY_MS=${EXPO_PUBLIC_MOCK_API_LATENCY_MS} \
    EXPO_PUBLIC_MOCK_API_FAILURE_RATE=${EXPO_PUBLIC_MOCK_API_FAILURE_RATE}
COPY . .
RUN npx expo export --platform web --output-dir dist

# ─── Web: production runtime (non-root nginx) ─────────────────────────────────
FROM nginxinc/nginx-unprivileged:1.27-alpine AS web
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
