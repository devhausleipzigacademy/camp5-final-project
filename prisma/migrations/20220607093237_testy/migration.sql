/*
  Warnings:

  - You are about to drop the column `userIdentifier` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `subcatName` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Subcategory` table. All the data in the column will be lost.
  - Added the required column `subcatId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userIdentifier_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_subcatName_fkey";

-- DropIndex
DROP INDEX "Subcategory_name_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "userIdentifier",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "subcatName",
ADD COLUMN     "subcatId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("identifier") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_subcatId_fkey" FOREIGN KEY ("subcatId") REFERENCES "Subcategory"("identifier") ON DELETE RESTRICT ON UPDATE CASCADE;
