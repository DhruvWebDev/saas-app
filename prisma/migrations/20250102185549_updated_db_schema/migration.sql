/*
  Warnings:

  - You are about to drop the column `receiverEditorId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `receiverUserId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderEditorId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderUserId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverEditorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverUserId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderEditorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderUserId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverEditorId",
DROP COLUMN "receiverUserId",
DROP COLUMN "senderEditorId",
DROP COLUMN "senderUserId",
DROP COLUMN "updatedAt",
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;
