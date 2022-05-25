-- CreateEnum
CREATE TYPE "SellType" AS ENUM ('SWAP', 'FREE');

-- CreateTable
CREATE TABLE "User" (
    "identifier" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "passwordSalt" TEXT NOT NULL,
    "profilePicture" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "favorite" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "Location" (
    "identifier" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "identifier" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB NOT NULL,
    "userIdentifier" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "Category" (
    "identifier" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("identifier")
);

-- CreateTable
CREATE TABLE "Item" (
    "identifier" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "images" JSONB NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sellType" "SellType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catId" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("identifier")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_userId_key" ON "Location"("userId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userIdentifier_fkey" FOREIGN KEY ("userIdentifier") REFERENCES "User"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_catId_fkey" FOREIGN KEY ("catId") REFERENCES "Category"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
