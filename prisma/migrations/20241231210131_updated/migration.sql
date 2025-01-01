/*
  Warnings:

  - Added the required column `name` to the `EditorAccess` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EditorAccess" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "thumbnail_url" TEXT;
