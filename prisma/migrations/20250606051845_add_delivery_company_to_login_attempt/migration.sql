/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `DeliveryPackage` table. All the data in the column will be lost.
  - Added the required column `deliveryCompany` to the `LoginAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UnlockEvent" DROP CONSTRAINT "UnlockEvent_packageTrackingNumber_fkey";

-- AlterTable
ALTER TABLE "DeliveryPackage" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "LoginAttempt" ADD COLUMN     "deliveryCompany" TEXT NOT NULL;
