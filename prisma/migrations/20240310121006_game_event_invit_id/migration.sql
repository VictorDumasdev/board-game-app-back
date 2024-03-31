/*
  Warnings:

  - You are about to drop the column `eventId` on the `Invitations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invitations" DROP CONSTRAINT "Invitations_eventId_fkey";

-- AlterTable
ALTER TABLE "GameEvent" ADD COLUMN     "invitations" INTEGER[];

-- AlterTable
ALTER TABLE "Invitations" DROP COLUMN "eventId";
