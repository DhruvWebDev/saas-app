/*
  Warnings:

  - You are about to drop the column `userId` on the `Editor` table. All the data in the column will be lost.
  - Added the required column `editorId` to the `Editor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_userId_fkey";

-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "userId",
ADD COLUMN     "editorId" TEXT NOT NULL;
