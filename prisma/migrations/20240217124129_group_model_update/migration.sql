/*
  Warnings:

  - Added the required column `adminUserEmail` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canAnyoneInvite` to the `Groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "adminUserEmail" TEXT NOT NULL,
ADD COLUMN     "canAnyoneInvite" BOOLEAN NOT NULL;
