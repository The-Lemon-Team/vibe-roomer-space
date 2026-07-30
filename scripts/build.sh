#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# scripts/build.sh
#
# Build production Docker images for vibe-roomer.
# Tags each image with both the current git SHA and 'latest'.
#
# Usage:
#   ./scripts/build.sh           # builds both images
#   ./scripts/build.sh backend   # builds only the backend image
#   ./scripts/build.sh frontend  # builds only the frontend image
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

GIT_SHA="$(git rev-parse --short HEAD 2>/dev/null || echo 'local')"
IMAGE_PREFIX="vibe-roomer"
TARGET="${1:-all}"

echo "╔══════════════════════════════════════════╗"
echo "║      Vibe Roomer — Production Build      ║"
echo "╚══════════════════════════════════════════╝"
echo "  Repo root : $REPO_ROOT"
echo "  Git SHA   : $GIT_SHA"
echo "  Target    : $TARGET"
echo ""

build_backend() {
  echo "▶ Building backend image..."
  docker build \
    --file server/Dockerfile \
    --tag "${IMAGE_PREFIX}-backend:${GIT_SHA}" \
    --tag "${IMAGE_PREFIX}-backend:latest" \
    --progress=plain \
    .
  echo "✔ Backend: ${IMAGE_PREFIX}-backend:${GIT_SHA}"
}

build_frontend() {
  echo "▶ Building frontend image..."

  # Pass VITE_API_URL build arg (default /api for nginx proxy)
  VITE_API_URL="${VITE_API_URL:-/api}"

  docker build \
    --file Dockerfile.client \
    --tag "${IMAGE_PREFIX}-frontend:${GIT_SHA}" \
    --tag "${IMAGE_PREFIX}-frontend:latest" \
    --build-arg "VITE_API_URL=${VITE_API_URL}" \
    --progress=plain \
    .
  echo "✔ Frontend: ${IMAGE_PREFIX}-frontend:${GIT_SHA}"
}

case "$TARGET" in
  backend)  build_backend  ;;
  frontend) build_frontend ;;
  all)
    build_backend
    build_frontend
    ;;
  *)
    echo "❌ Unknown target: $TARGET. Use 'backend', 'frontend', or 'all'."
    exit 1
    ;;
esac

echo ""
echo "✅ Build complete — SHA: $GIT_SHA"
