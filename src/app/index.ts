// filepath: /Users/minnie/Develop/Visual Studio Code/DoorUnlocker/src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createRoot } from "react-dom/client";

dotenv.config(); // .env 파일이 있다면 환경 변수를 로드합니다.

const app: Express = express();
const port = process.env.PORT || 3000; // 환경 변수 PORT를 사용하거나 기본값 3001을 사용

app.get("/", (req: Request, res: Response) => {
  res.send();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
