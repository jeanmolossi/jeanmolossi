import { FiHome, FiTv, FiBook } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { TbHandClick } from 'react-icons/tb';

export const menuItems = [
    { href: '/', as: '/', label: 'Início', icon: FiHome },
    {
        href: '/',
        as: '/#about-me',
        label: 'Sobre mim',
        icon: ImProfile,
    },
    {
        href: '/aprendizado',
        as: '/aprendizado',
        label: 'Aprendizado',
        icon: FiTv,
    },
    { href: '/blog', as: '/blog', label: 'Blog', icon: FiBook },
    { href: '/contato', as: '/contato', label: 'Contato ?', icon: TbHandClick },
] as const;

type MenuItems = typeof menuItems;

export type Labels<T> = T extends []
    ? Labels<T[number]>
    : T extends object
    ? MenuItems[number]['label']
    : never;

export function getItem(label: Labels<MenuItems>): MenuItems[number] {
    const item = menuItems.findIndex(item => item.label === label);

    if (item < 0) {
        return menuItems[0];
    }

    return menuItems[item];
}
