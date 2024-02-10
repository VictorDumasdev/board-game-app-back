-- CreateTable
CREATE TABLE "Invitations" (
    "id" SERIAL NOT NULL,
    "senderUserId" INTEGER NOT NULL,
    "receiverUserEmail" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);
