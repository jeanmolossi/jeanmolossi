import { Api } from "@/config/constants";
import { AxiosError } from "axios";
import { format } from "util";
import { z } from "zod";
import { telegram } from "../api/telegram";

interface Notify {
    method: string;
    message: string;
    error?: Error | AxiosError
}

export async function notify({ method, message, error }: Notify) {
    try {
        const errMsg = error?.message || 'Ocorreu um erro em uma chamada'

        const text = format('*[ ERROR ]* %s\n\n%s\n\nErro:\n```%s```', method, message, errMsg)

        const body = { text }

        const data = z.object({
            text: z.string(),
            parse_mode: z.enum(['Markdown', 'HTML']).default('Markdown'),
            disable_notification: z.boolean().default(false),
            disable_web_page_preview: z.boolean().default(false),
            chat_id: z.string().default(Api().TELEGRAM_MY_ID),
        }).parse(body);

        await telegram.post('/sendMessage', data)
    } catch (error) {
        console.log('notify error', error)
    }
}
