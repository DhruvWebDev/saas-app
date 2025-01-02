-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('USER', 'EDITOR');

-- DropForeignKey
ALTER TABLE "Editor" DROP CONSTRAINT "Editor_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_receiverId_fkey";
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- Handle NULL values in `Editor.userId`
UPDATE "Editor"
SET "userId" = (SELECT "id" FROM "User" LIMIT 1) -- Replace with a specific user ID if necessary
WHERE "userId" IS NULL;

-- AlterTable: Add new columns first to avoid referencing non-existent columns
ALTER TABLE "Message"
ADD COLUMN "receiverEditorId" TEXT,
ADD COLUMN "receiverUserId" TEXT,
ADD COLUMN "senderEditorId" TEXT,
ADD COLUMN "senderUserId" TEXT;

-- Preserve `Message.senderId` and `Message.receiverId` data
-- Populate new columns before dropping old ones
UPDATE "Message"
SET "senderUserId" = CASE
                       WHEN EXISTS (SELECT 1 FROM "User" WHERE "id" = "senderId") THEN "senderId"
                       ELSE NULL
                     END,
    "senderEditorId" = CASE
                         WHEN EXISTS (SELECT 1 FROM "Editor" WHERE "id" = "senderId") THEN "senderId"
                         ELSE NULL
                       END,
    "receiverUserId" = CASE
                         WHEN EXISTS (SELECT 1 FROM "User" WHERE "id" = "receiverId") THEN "receiverId"
                         ELSE NULL
                       END,
    "receiverEditorId" = CASE
                           WHEN EXISTS (SELECT 1 FROM "Editor" WHERE "id" = "receiverId") THEN "receiverId"
                           ELSE NULL
                         END;

-- Drop old columns
ALTER TABLE "Message" DROP COLUMN "receiverId";
ALTER TABLE "Message" DROP COLUMN "senderId";

-- AlterTable: Make `userId` required after resolving NULL values
ALTER TABLE "Editor" ALTER COLUMN "userId" SET NOT NULL;

-- Re-create Foreign Keys
ALTER TABLE "Editor" ADD CONSTRAINT "Editor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Message" ADD CONSTRAINT "Message_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Message" ADD CONSTRAINT "Message_senderEditorId_fkey" FOREIGN KEY ("senderEditorId") REFERENCES "Editor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverUserId_fkey" FOREIGN KEY ("receiverUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverEditorId_fkey" FOREIGN KEY ("receiverEditorId") REFERENCES "Editor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
