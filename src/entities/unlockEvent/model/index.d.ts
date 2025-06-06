export type UnlockEvent = {
  id: number;
  timestamp: Date;
  ipAddress: string;
  os: string;
  userAgent: string;
  packageTrackingNumber: string;
  deliveryCompany: string;
  sessionId: string | null;
  createdAt: Date;
};
