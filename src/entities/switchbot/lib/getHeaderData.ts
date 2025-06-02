import crypto from "crypto";

const getHeaderData = () => {
  const token = process.env.SWITCHBOT_API_TOKEN;
  const secret = process.env.SWITCHBOT_API_SECRET;
  if (!token || !secret) throw new Error("SwitchBot API token and secret are required");

  const time = Date.now();
  const nonce = `${time}${Math.floor(Math.random() * 1000)}`;
  const data = token + time + nonce;
  const sign = crypto.createHmac("sha256", secret).update(data).digest("base64");

  return {
    token,
    secret,
    time,
    nonce,
    sign,
  };
};

export default getHeaderData;
