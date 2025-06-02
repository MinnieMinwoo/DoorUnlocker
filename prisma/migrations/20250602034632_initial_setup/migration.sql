-- CreateTable
CREATE TABLE "DeliveryPackage" (
    "id" SERIAL NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "deliveryCompany" TEXT NOT NULL,
    "estimatedDeliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "webBrowser" TEXT NOT NULL,
    "packageTrackingNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnlockEvent" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "webBrowser" TEXT NOT NULL,
    "packageTrackingNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnlockEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryPackage_trackingNumber_key" ON "DeliveryPackage"("trackingNumber");

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_packageTrackingNumber_fkey" FOREIGN KEY ("packageTrackingNumber") REFERENCES "DeliveryPackage"("trackingNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnlockEvent" ADD CONSTRAINT "UnlockEvent_packageTrackingNumber_fkey" FOREIGN KEY ("packageTrackingNumber") REFERENCES "DeliveryPackage"("trackingNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
