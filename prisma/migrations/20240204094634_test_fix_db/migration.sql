/*
  Warnings:

  - You are about to drop the column `everPlayedGames` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteGames` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `ownedGames` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "everPlayedGames",
DROP COLUMN "favoriteGames",
DROP COLUMN "ownedGames";
