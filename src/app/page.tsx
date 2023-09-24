import { Metadata } from "next";
import { Home } from "@/presentation/pages/home";

export const metadata: Metadata = {
    title: 'Portfólio | Jean Molossi',
    description: 'Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software).',
    alternates: {
        canonical: 'https://jeanmolossi.com.br',
    },
    publisher: 'https://jeanmolossi.com.br',
    robots: {
        index: true,
        follow: true,
    }
}

export default function HomePage() {
    return <Home />
}
