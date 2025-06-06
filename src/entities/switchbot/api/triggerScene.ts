import { apiURL } from "../config/backend";
import getHeaderData from "../lib/getHeaderData";

const triggerScene = async (sceneId: string) => {
  const { token, sign, nonce, time } = getHeaderData();

  console.log("Triggering scene with ID:", sceneId);

  const response = await fetch(`${apiURL}/scenes/${sceneId}/execute`, {
    method: "POST",
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

  const result = await response.json();
  return result;
};

export default triggerScene;
