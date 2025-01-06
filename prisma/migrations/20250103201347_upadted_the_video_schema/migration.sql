/*
  Warnings:

  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `editorId` on table `Video` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_editorId_fkey";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
ALTER COLUMN "editorId" SET NOT NULL,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id", "editorId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
