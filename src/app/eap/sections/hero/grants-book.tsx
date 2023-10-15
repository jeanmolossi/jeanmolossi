'use client';

import { MouseEventHandler } from 'react';
import styles from './styles.module.css'

export function GrantBook() {
    const click: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        alert('Calma ae mestre, ainda não tá pronto!')
    }

    return <a href="#" onClick={click} className={styles.grant_book}>Quero o meu agora!</a>
}
