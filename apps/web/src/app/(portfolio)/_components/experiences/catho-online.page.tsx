import CathoOnline from '@/app/components/sections/experiences/catho-online';
import config from '@/data/content/catho-online.json';
import { trimAfter } from '@/presentation/helpers/string';
import { Metadata } from 'next';
import Header from './header';

const { end_period: end, role, start_period: start, title } = config;

export const metadata: Metadata = {
    title: trimAfter.call(`${role} | ${title} - Experiência`, 50),
    description: trimAfter.call(`Uma breve descrição da minha experiência como ${role} em ${title}`)
}

export default async function Page() {

    return (
        <div className="max-w-screen-lg flex flex-col min-h-[70vh] mx-auto justify-center py-8">
            <Header
                title={title}
                role={role}
                period={{ start, end }}
            />

            <CathoOnline />
        </div>
    )
}
