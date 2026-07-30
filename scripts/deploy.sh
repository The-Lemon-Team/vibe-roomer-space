#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# scripts/deploy.sh
#
# Deploy vibe-roomer to production using docker-compose.prod.yml.
# Database is hosted on Supabase — no local postgres startup needed.
# Prisma migrations run against Supabase via DIRECT_URL at container startup.
#
# Prerequisites:
#   - Docker & Docker Compose installed on the target host
#   - A .env file in the repo root with all production secrets
#     (copy from .env.prod.example and fill in values)
#
# Usage:
#   ./scripts/deploy.sh              # deploy (build if needed)
#   ./scripts/deploy.sh --no-build   # use pre-built images (skip docker build)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

COMPOSE_FILE="docker-compose.prod.yml"
NO_BUILD="${1:-}"

echo "╔══════════════════════════════════════════╗"
echo "║     Vibe Roomer — Production Deploy      ║"
echo "╚══════════════════════════════════════════╝"
echo "  Repo root   : $REPO_ROOT"
echo "  Compose file: $COMPOSE_FILE"
echo "  Database     : Supabase (external)"
echo ""

# ── Pre-flight checks ─────────────────────────────────────────────────────────
if [[ ! -f ".env" ]]; then
  echo "❌ .env file not found."
  echo "   Copy .env.prod.example → .env and fill in your Supabase URLs and secrets."
  exit 1
fi

if ! command -v docker &>/dev/null; then
  echo "❌ docker not found in PATH."
  exit 1
fi

if ! docker compose version &>/dev/null; then
  echo "❌ docker compose (v2) not found. Please upgrade Docker."
  exit 1
fi

# Validate that critical Supabase env vars are present in .env
for var in DATABASE_URL DIRECT_URL JWT_SECRET; do
  if ! grep -qE "^${var}=.+" .env; then
    echo "❌ Missing required variable '${var}' in .env"
    echo "   See .env.prod.example for reference."
    exit 1
  fi
done

echo "✔ Pre-flight checks passed."

# ── Pull latest base images ───────────────────────────────────────────────────
echo "▶ Pulling base images..."
docker compose -f "$COMPOSE_FILE" pull --ignore-buildable 2>/dev/null || true

# ── Build (unless --no-build) ─────────────────────────────────────────────────
if [[ "$NO_BUILD" != "--no-build" ]]; then
  echo "▶ Building images..."
  docker compose -f "$COMPOSE_FILE" build --parallel
fi

# ── Bring up all services ─────────────────────────────────────────────────────
# Note: Prisma migrations (prisma migrate deploy) run automatically inside
#       the backend container CMD before the server starts.
echo "▶ Bringing up all services..."
docker compose -f "$COMPOSE_FILE" up -d --remove-orphans

# ── Status ────────────────────────────────────────────────────────────────────
echo "   Waiting for services to initialise..."
sleep 8
docker compose -f "$COMPOSE_FILE" ps

echo ""
echo "✅ Deploy complete!"
echo ""
echo "Services:"
FRONTEND_PORT=$(grep '^FRONTEND_PORT=' .env | cut -d= -f2 || echo 80)
echo "  Frontend : http://localhost:${FRONTEND_PORT}"
echo "  Backend  : http://localhost:${FRONTEND_PORT}/api"
echo ""
echo "Logs: docker compose -f $COMPOSE_FILE logs -f"
echo "DB  : Supabase dashboard → https://supabase.com/dashboard"
