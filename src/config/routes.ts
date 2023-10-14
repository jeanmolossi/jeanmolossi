import { BsGraphUp } from 'react-icons/bs';
import { FaMedal } from 'react-icons/fa';
import { FiHome, FiTv, FiBook, FiGift } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { TbHandClick } from 'react-icons/tb';

export const menuItems = [
    { href: '/', as: '/', label: 'Início', icon: FiHome },
    {
        href: '/',
        as: '/#experiencias',
        label: 'Experiências',
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
];

type MenuItems = typeof menuItems;

export const eapMenuItems: MenuItems = [
    { href: '/eap', as: '#inicio', label: 'Início', icon: FiHome },
    { href: '/eap', as: '#content', label: 'Conteúdo', icon: FiBook },
    { href: '/eap', as: '#bonus', label: 'Bônus', icon: FiGift },
    { href: '/eap', as: '#guarantee', label: 'Garantia', icon: FaMedal },
    { href: '/', as: '/', label: 'Portfólio', icon: ImProfile },
]

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
