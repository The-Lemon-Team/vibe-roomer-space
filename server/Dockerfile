# ─────────────────────────────────────────────
#  Stage 1: Build
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies needed to compile native modules
RUN apk add --no-cache python3 make g++

# Copy prisma schema (from repo root context)
COPY prisma ./prisma

# Copy server package files first for layer caching
COPY server/package*.json ./

RUN npm ci

# Copy server source
COPY server/ .

# Generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npm run build

# ─────────────────────────────────────────────
#  Stage 2: Production runner
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only what is needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Uploads volume mount point
RUN mkdir -p ./uploads && chown -R appuser:appgroup ./uploads

USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
