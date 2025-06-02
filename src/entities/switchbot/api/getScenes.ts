import { apiURL } from "../config/backend";
import crypto from "crypto";
import { SceneResponse } from "../model/sceneResponse";

const getScenes = async (): Promise<any> => {
  const token = process.env.SWITCHBOT_API_TOKEN;
  const secret = process.env.SWITCHBOT_API_SECRET;
  if (!token || !secret) throw new Error("SwitchBot API token and secret are required");

  const time = Date.now();
  const nonce = `${time}${Math.floor(Math.random() * 1000)}`;
  const data = token + time + nonce;
  const sign = crypto.createHmac("sha256", secret).update(data).digest("base64");

  const response = await fetch(`${apiURL}/scenes`, {
    method: "GET",
    headers: {
      Authorization: token,
      sign,
      nonce,
      t: time.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching scenes: ${response.statusText}`);
  }

  const result: SceneResponse = await response.json();
  return result.body;
};

export default getScenes;
