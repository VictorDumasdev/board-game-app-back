/*
  Warnings:

  - You are about to drop the column `senderUserId` on the `Invitations` table. All the data in the column will be lost.
  - Added the required column `senderUserEmail` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitations" DROP COLUMN "senderUserId",
ADD COLUMN     "senderUserEmail" TEXT NOT NULL;
