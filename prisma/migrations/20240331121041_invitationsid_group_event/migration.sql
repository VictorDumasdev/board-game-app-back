/*
  Warnings:

  - You are about to drop the column `invitations` on the `GameEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameEvent" DROP COLUMN "invitations",
ADD COLUMN     "invitationsId" INTEGER[];

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "invitationsId" INTEGER[];
