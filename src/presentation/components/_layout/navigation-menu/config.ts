import { Contact, Home, ListVideo, Newspaper, NotebookText } from "lucide-react";
import { FiTv, FiBook } from "react-icons/fi";
import { ImProfile } from "react-icons/im";
import { TbHandClick } from "react-icons/tb";

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
        href: '/playlists',
        as: '/playlists',
        label: 'Playlists',
        icon: ListVideo,
    },
    {
        href: '/blog',
        as: '/blog',
        label: 'Blog',
        icon: Newspaper,
    },
    {
        href: '/contato',
        as: '/contato',
        label: 'Contato ?',
        icon: Contact,
    },
] as const

export type MenuItem = typeof items;
