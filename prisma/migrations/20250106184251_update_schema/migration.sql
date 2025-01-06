/*
  Warnings:

  - You are about to drop the column `editorId` on the `Editor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Editor" DROP COLUMN "editorId",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
