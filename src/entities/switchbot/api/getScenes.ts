import { apiURL } from "../config/backend";
import { SceneResponse } from "../model/sceneResponse";
import getHeaderData from "../lib/getHeaderData";

const getScenes = async () => {
  const { token, sign, nonce, time } = getHeaderData();

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
