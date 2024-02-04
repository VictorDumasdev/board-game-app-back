/*
  Warnings:

  - The `ownedGames` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `favoriteGames` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `everPlayedGames` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "ownedGames",
ADD COLUMN     "ownedGames" INTEGER[],
DROP COLUMN "favoriteGames",
ADD COLUMN     "favoriteGames" INTEGER[],
DROP COLUMN "everPlayedGames",
ADD COLUMN     "everPlayedGames" INTEGER[];
