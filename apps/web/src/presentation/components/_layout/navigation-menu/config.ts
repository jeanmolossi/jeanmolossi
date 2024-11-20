import { Contact, Home, ListVideo, Newspaper, NotebookText } from 'lucide-react';

export const items = [
    {
        href: '/',
        as: '/',
        label: 'Início',
        icon: Home,
    },
    {
        href: '/',
        as: '/#experiencias',
        label: 'Experiências',
        icon: NotebookText,
    },
    {
        href: '/cursos',
        as: '/cursos',
        label: 'Cursos',
        icon: ListVideo,
    },
    {
        href: '/contato',
        as: '/contato',
        label: 'Contato ?',
        icon: Contact,
    },
] as const;

export type MenuItem = typeof items;
