'use client';

import { ChangeEvent, useEffect, useState } from "react"
import Link from "next/link"
import { menuItems } from "@/config/routes"
import { usePathname, useSearchParams } from "next/navigation";
import styles from './styles.module.css'

export const Navbar = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [visible, setVisible] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked)
    }

    useEffect(() => {
        const closeMenu = () => setVisible(false)

        pathname + (searchParams?.toString() || '')
        closeMenu()
    }, [pathname, searchParams])

    return (
        <nav className={styles.menu_container}>
            <label>
                <input
                    type="checkbox"
                    aria-label="Toggle menu"
                    onChange={onChange}
                    checked={visible}
                />
                <span></span>
                <span></span>
                <span></span>
            </label>

            <div className={styles.menu_logo}>
                <Link href={"/"}>
                    <h1>Jean Molossi</h1>
                </Link>
            </div>

            <div className={[
                styles.menu,
                visible ? styles.opened : "",
            ].join(' ')}>
                <ul>
                    {menuItems.map((item, i) => {
                        const { href, as, label, icon:Icon } = item

                        return (
                            <li key={i.toString()}>
                                <Link
                                    href={href}
                                    as={as}
                                >
                                    <Icon />
                                    { label }
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}
