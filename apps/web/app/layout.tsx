import '@/styles/globals.css';
import { ThemeProvider } from '@jeanmolossi/ui';
import '@jeanmolossi/ui/dist/index.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Portfólio | Jean Molossi',
    description:
        'Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software).',
    alternates: {
        canonical: 'https://jeanmolossi.com.br',
    },
    publisher: 'https://jeanmolossi.com.br',
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
