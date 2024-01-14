/*
  Warnings:

  - A unique constraint covering the columns `[bggId]` on the table `Games` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bggId` to the `Games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "bggId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Games_bggId_key" ON "Games"("bggId");
