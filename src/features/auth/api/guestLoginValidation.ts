import { isToday } from "@/shared";
import { getDeliveryCode } from "@/entities/deliveryCode";
import { getLoginAttempts } from "@/entities/loginAttempt";

const guestLoginValidation = async (
  trackingCode: string,
  deliveryCompany: string
): Promise<{
  result: boolean;
  status: number;
}> => {
  const result = await getDeliveryCode(trackingCode, deliveryCompany);
  if (!result)
    return {
      result: false,
      status: 404,
    };

  const { estimatedDeliveryDate } = result;
  if (!estimatedDeliveryDate || !isToday(estimatedDeliveryDate))
    return {
      result: false,
      status: 401,
    };

  const [succeedLoginResult, failedLoginResult] = await Promise.all([
    getLoginAttempts(trackingCode, true),
    getLoginAttempts(trackingCode, false),
  ]);

  if (succeedLoginResult.length >= 3 || failedLoginResult.length >= 5)
    return {
      result: false,
      status: 403,
    };

  return {
    result: true,
    status: 200,
  };
};

export default guestLoginValidation;
