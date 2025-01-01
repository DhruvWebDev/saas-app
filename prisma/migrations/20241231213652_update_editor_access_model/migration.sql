/*
  Warnings:

  - You are about to drop the column `editorId` on the `EditorAccess` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EditorAccess" DROP CONSTRAINT "EditorAccess_editorId_fkey";

-- AlterTable
ALTER TABLE "EditorAccess" DROP COLUMN "editorId";

-- AddForeignKey
ALTER TABLE "EditorAccess" ADD CONSTRAINT "EditorAccess_email_fkey" FOREIGN KEY ("email") REFERENCES "Editor"("email") ON DELETE CASCADE ON UPDATE CASCADE;
