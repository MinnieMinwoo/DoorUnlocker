export type SceneResponse = {
  statusCode: number;
  body: Array<{
    sceneId: string;
    sceneName: string;
  }>;
  message: string;
};
