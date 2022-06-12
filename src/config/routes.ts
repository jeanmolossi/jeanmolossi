import { IconType } from 'react-icons';
import { FiHome, FiTv, FiBook } from 'react-icons/fi';
import { ImProfile } from 'react-icons/im';
import { TbHandClick } from 'react-icons/tb';

type MenuItem = {
    href: string;
    label: string;
    icon: IconType;
};

export const menuItems: MenuItem[] = [
    { href: '/', label: 'Início', icon: FiHome },
    { href: '/', label: 'Sobre mim', icon: ImProfile },
    { href: '/', label: 'Aprendizado', icon: FiTv },
    { href: '/', label: 'Blog', icon: FiBook },
    { href: '/', label: 'Contato ?', icon: TbHandClick },
];
