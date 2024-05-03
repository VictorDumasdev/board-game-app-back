/*
  Warnings:

  - You are about to drop the `GroupsInvitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupsInvitation" DROP CONSTRAINT "GroupsInvitation_groupId_fkey";

-- DropTable
DROP TABLE "GroupsInvitation";
