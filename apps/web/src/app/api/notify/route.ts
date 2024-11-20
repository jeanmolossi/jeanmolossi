import { discord } from '@/data/api/discord';
import { telegram } from '@/data/api/telegram';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    if (!request.headers.get('host')?.match(/https?:\/\/jeanmolossi\.com\.br/)) {
        return new NextResponse(null, {
            status: 403,
            headers: {
                'Access-Control-Allow-Origin': 'https://jeanmolossi.com.br',
            },
        });
    }

    const body = await request.json();

    try {
        const data = z
            .object({
                text: z.string(),
                parse_mode: z.enum(['Markdown', 'HTML']).default('Markdown'),
                disable_notification: z.boolean().default(false),
                disable_web_page_preview: z.boolean().default(false),
                chat_id: z.string().default(process.env.TELEGRAM_MY_ID!),
            })
            .parse(body);

        const discordText = {
            embeds: [
                {
                    type: 'rich',
                    title: 'Notificacao!',
                    description: '',
                    color: 0x00ffff,
                    fields: [
                        {
                            name: `Mensagem`,
                            value: data.text,
                        },
                    ],
                },
            ],
        };

        await telegram.post('/sendMessage', data);
        await discord.post('/', discordText);
    } catch (err: any) {
        console.log('notify err', err);
        return new NextResponse(JSON.stringify(err), { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
}
