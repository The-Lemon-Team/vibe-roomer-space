-- CreateEnum
CREATE TYPE "MenuTagScope" AS ENUM ('VIBES', 'ROOMS');

-- CreateTable
CREATE TABLE "MenuTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scope" "MenuTagScope" NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MenuTag_scope_sortOrder_idx" ON "MenuTag"("scope", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "MenuTag_name_scope_key" ON "MenuTag"("name", "scope");
