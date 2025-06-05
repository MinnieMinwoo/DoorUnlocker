export type LoginAttempt = {
  id: number;
  timestamp: Date;
  success: boolean;
  ipAddress: string;
  os: string;
  userAgent: string;
  packageTrackingNumber: string;
  sessionId?: string | null;
  createdAt: Date;
};
