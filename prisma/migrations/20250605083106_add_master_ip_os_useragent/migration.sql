/*
  Warnings:

  - You are about to drop the column `webBrowser` on the `LoginAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `webBrowser` on the `UnlockEvent` table. All the data in the column will be lost.
  - Added the required column `userAgent` to the `LoginAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ipAddress` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `Master` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `UnlockEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoginAttempt" DROP COLUMN "webBrowser",
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "userAgent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "ipAddress" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UnlockEvent" DROP COLUMN "webBrowser",
ADD COLUMN     "userAgent" TEXT NOT NULL;
