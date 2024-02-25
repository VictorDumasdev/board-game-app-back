-- CreateTable
CREATE TABLE "GroupsInvitation" (
    "id" SERIAL NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "senderNickname" TEXT NOT NULL,
    "receiverEmail" TEXT NOT NULL,
    "receiverNickname" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupsInvitation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupsInvitation" ADD CONSTRAINT "GroupsInvitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
