import { getScenes } from "@/entities/switchbot";

export async function POST(request: Request) {
  try {
    const result = await getScenes();
    console.log(result);
    return new Response("オートロック解除しました", {
      status: 200,
    });
  } catch (error) {
    console.error("Error unlocking:", error);
  }
}
