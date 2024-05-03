/*
  Warnings:

  - You are about to drop the column `maxParticipants` on the `GameEvent` table. All the data in the column will be lost.
  - Added the required column `type` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvitationsType" AS ENUM ('FRIEND', 'GROUP', 'EVENT');

-- AlterTable
ALTER TABLE "GameEvent" DROP COLUMN "maxParticipants";

-- AlterTable
ALTER TABLE "Invitations" ADD COLUMN     "type" "InvitationsType" NOT NULL;
