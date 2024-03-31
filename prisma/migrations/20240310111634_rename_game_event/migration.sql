/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Invitations" DROP CONSTRAINT "Invitations_eventId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUsers" DROP CONSTRAINT "_EventToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToUsers" DROP CONSTRAINT "_EventToUsers_B_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "_EventToUsers";

-- CreateTable
CREATE TABLE "GameEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "suggestedGamesId" INTEGER[],
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GameEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameEventToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameEventToUsers_AB_unique" ON "_GameEventToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GameEventToUsers_B_index" ON "_GameEventToUsers"("B");

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "GameEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameEvent" ADD CONSTRAINT "GameEvent_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameEventToUsers" ADD CONSTRAINT "_GameEventToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "GameEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameEventToUsers" ADD CONSTRAINT "_GameEventToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
