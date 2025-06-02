import { getScenes, triggerScene } from "@/entities/switchbot";

const unlock = async () => {
  try {
    const scenes = await getScenes();
    const targetScene = scenes.find((scene) => scene.sceneName === process.env.SWITCHBOT_SCENE_NAME);
    if (!targetScene) {
      throw new Error("Target scene 'オートロック解除' not found");
    }

    const result = await triggerScene(targetScene.sceneId);
    if (result.status >= 400) {
      throw new Error(`Failed to trigger scene: ${result.message}`);
    }

    return;
  } catch (error) {
    console.error("Error unlocking:", error);
    throw error;
  }
};

export default unlock;
