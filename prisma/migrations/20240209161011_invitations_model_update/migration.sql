/*
  Warnings:

  - You are about to drop the column `receiverUserEmail` on the `Invitations` table. All the data in the column will be lost.
  - You are about to drop the column `senderUserEmail` on the `Invitations` table. All the data in the column will be lost.
  - Added the required column `receiverEmail` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverNickname` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderEmail` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderNickname` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invitations" DROP COLUMN "receiverUserEmail",
DROP COLUMN "senderUserEmail",
ADD COLUMN     "receiverEmail" TEXT NOT NULL,
ADD COLUMN     "receiverNickname" TEXT NOT NULL,
ADD COLUMN     "senderEmail" TEXT NOT NULL,
ADD COLUMN     "senderNickname" TEXT NOT NULL;
