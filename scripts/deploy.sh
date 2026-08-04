#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# scripts/deploy.sh
#
# Deploy vibe-roomer to production using an explicit database variant.
# Supported variants:
#   - supabase: external hosted Postgres via Supabase
#   - internal: local Postgres container inside the compose stack
#
# Prerequisites:
#   - Docker & Docker Compose installed on the target host
#   - A .env file in the repo root with all production secrets
#     (copy from the matching .env.prod.*.example and fill in values)
#
# Usage:
#   ./scripts/deploy.sh supabase              # deploy Supabase-backed stack
#   ./scripts/deploy.sh internal              # deploy internal-Postgres stack
#   ./scripts/deploy.sh supabase --no-build   # use pre-built images
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

VARIANT="supabase"
NO_BUILD=""

for arg in "$@"; do
  case "$arg" in
    supabase|internal)
      VARIANT="$arg"
      ;;
    --no-build)
      NO_BUILD="--no-build"
      ;;
    *)
      echo "❌ Unknown argument: $arg"
      echo "   Use: ./scripts/deploy.sh [supabase|internal] [--no-build]"
      exit 1
      ;;
  esac
done

case "$VARIANT" in
  supabase)
    COMPOSE_FILE="docker-compose.prod.supabase.yml"
    ENV_EXAMPLE=".env.prod.supabase.example"
    DB_LABEL="Supabase (external)"
    REQUIRED_VARS=(DATABASE_URL DIRECT_URL JWT_SECRET SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY)
    ;;
  internal)
    COMPOSE_FILE="docker-compose.prod.internal.yml"
    ENV_EXAMPLE=".env.prod.internal.example"
    DB_LABEL="Internal Postgres container"
    REQUIRED_VARS=(POSTGRES_PASSWORD JWT_SECRET)
    ;;
  *)
    echo "❌ Unknown variant: $VARIANT"
    echo "   Use one of: supabase, internal"
    exit 1
    ;;
esac

echo "╔══════════════════════════════════════════╗"
echo "║     Vibe Roomer — Production Deploy      ║"
echo "╚══════════════════════════════════════════╝"
echo "  Repo root   : $REPO_ROOT"
echo "  Variant     : $VARIANT"
echo "  Compose file: $COMPOSE_FILE"
echo "  Database     : $DB_LABEL"
echo ""

# ── Pre-flight checks ─────────────────────────────────────────────────────────
if [[ ! -f ".env" ]]; then
  echo "❌ .env file not found."
  echo "   Copy $ENV_EXAMPLE → .env and fill in the required secrets."
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

# Validate that critical env vars are present in .env
for var in "${REQUIRED_VARS[@]}"; do
  if ! grep -qE "^${var}=.+" .env; then
    echo "❌ Missing required variable '${var}' in .env"
    echo "   See $ENV_EXAMPLE for reference."
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
if [[ "$VARIANT" == "supabase" ]]; then
  echo "DB  : Supabase dashboard → https://supabase.com/dashboard"
else
  echo "DB  : docker compose -f $COMPOSE_FILE exec postgres psql -U \${POSTGRES_USER:-postgres} -d \${POSTGRES_DB:-viberoomer}"
fi
