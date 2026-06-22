-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MANGA', 'ROMAN', 'AUDIO');

-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('A_LIRE', 'EN_COURS', 'TERMINE', 'STAND_BY');

-- CreateTable
CREATE TABLE "Oeuvre" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "mediaType" "MediaType" NOT NULL,
    "couvertureUrl" TEXT,
    "statut" "ReadingStatus" NOT NULL DEFAULT 'A_LIRE',
    "progression" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Oeuvre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "oeuvreId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
