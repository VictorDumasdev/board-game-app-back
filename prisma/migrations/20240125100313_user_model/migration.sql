-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "ownedGames" TEXT[],
    "favoriteGames" TEXT[],

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
