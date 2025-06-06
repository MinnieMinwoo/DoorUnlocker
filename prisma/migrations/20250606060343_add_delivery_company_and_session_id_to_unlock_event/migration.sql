/*
  Warnings:

  - Added the required column `deliveryCompany` to the `UnlockEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnlockEvent" ADD COLUMN     "deliveryCompany" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT;
