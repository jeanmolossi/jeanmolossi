'use client';

import { events } from '@/config/analytics';
import { MouseEventHandler } from 'react';
import styles from './styles.module.css';

export function GrantBook() {
    const click: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        alert('Calma ae mestre, ainda não tá pronto!')

        events.grantsBookClick()
    }

    return <a href="#" onClick={click} className={styles.grant_book}>Quero o meu agora!</a>
}
