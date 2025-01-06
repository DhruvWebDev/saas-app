/*
  Warnings:

  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `title` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[email]` on the table `EditorAccess` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[handleName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[youtubeVideoId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `EditorAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `EditorAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'UNLISTED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('GENERAL', 'VIDEO_UPDATE', 'MESSAGE', 'ACCESS_REQUEST', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'REVOKED');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VideoStatus" ADD VALUE 'FAILED';
ALTER TYPE "VideoStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "Editor" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "EditorAccess" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "status" "AccessStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "type" "NotificationType" NOT NULL DEFAULT 'GENERAL',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "preferences" JSONB;

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "ParticipantType";

-- CreateIndex
CREATE INDEX "Editor_email_idx" ON "Editor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EditorAccess_email_key" ON "EditorAccess"("email");

-- CreateIndex
CREATE INDEX "EditorAccess_userId_idx" ON "EditorAccess"("userId");

-- CreateIndex
CREATE INDEX "EditorAccess_email_idx" ON "EditorAccess"("email");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Message_receiverId_idx" ON "Message"("receiverId");

-- CreateIndex
CREATE INDEX "Message_createdAt_idx" ON "Message"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_read_idx" ON "Notification"("read");

-- CreateIndex
CREATE UNIQUE INDEX "User_handleName_key" ON "User"("handleName");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_handleName_idx" ON "User"("handleName");

-- CreateIndex
CREATE UNIQUE INDEX "Video_youtubeVideoId_key" ON "Video"("youtubeVideoId");

-- CreateIndex
CREATE INDEX "Video_userId_idx" ON "Video"("userId");

-- CreateIndex
CREATE INDEX "Video_editorId_idx" ON "Video"("editorId");

-- CreateIndex
CREATE INDEX "Video_status_idx" ON "Video"("status");

-- CreateIndex
CREATE INDEX "Video_createdAt_idx" ON "Video"("createdAt");

-- AddForeignKey
ALTER TABLE "EditorAccess" ADD CONSTRAINT "EditorAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
