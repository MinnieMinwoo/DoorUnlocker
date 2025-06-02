var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiURL } from "entities/switchbot/config/backend";
import crypto from "crypto";
const getScenes = () => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.SWITCHBOT_API_TOKEN;
    const secret = process.env.SWITCHBOT_API_SECRET;
    if (!token || !secret)
        throw new Error("SwitchBot API token and secret are required");
    const time = Date.now();
    const nonce = `${time}${Math.floor(Math.random() * 1000)}`;
    const data = token + time + nonce;
    const sign = crypto.createHmac("sha256", secret).update(data).digest("base64");
    const response = yield fetch(`${apiURL}/scenes`, {
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
    const result = yield response.json();
    return result.body;
});
export default getScenes;
