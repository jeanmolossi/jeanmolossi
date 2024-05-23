import { Api } from "@/config/constants";
import axios from "axios";

export const telegram = axios.create({
    baseURL: `https://api.telegram.org/bot${Api().TELEGRAM_BOT_TOKEN}`,
})
