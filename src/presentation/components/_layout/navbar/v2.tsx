import { ChangeEvent, useEffect, useState } from "react"
import Link from "next/link"
import styled, { css } from "styled-components"
import { menuItems } from "@/config/routes"
import { useRouter } from "next/router"

export const Navbar = () => {
    const { events } = useRouter()
    const [visible, setVisible] = useState(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setVisible(e.target.checked)
    }

    useEffect(() => {
        const closeMenu = () => setVisible(false)
        events.on('routeChangeStart', closeMenu)
        events.on('hashChangeStart', closeMenu)

        return () => {
            events.off('routeChangeStart', closeMenu)
            events.off('hashChangeStart', closeMenu)
        }
    }, [])

    return (
        <MenuContainer>
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

            <MenuLogo>
                <Link href={"/"}>
                    <h1>Jean Molossi</h1>
                </Link>
            </MenuLogo>

            <Menu className={visible ? "opened" : ""}>
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
            </Menu>
        </MenuContainer>
    )
}

const MenuLogo = styled.div`
    word-break: keep-all;
    flex-shrink: 0;
    margin-right: ${({ theme }) => theme.gutter.lg};
`

const Menu = styled.div`
    ul {
        display: inline-flex;
        list-style: none;
        gap: ${({ theme }) => `${theme.gutter.md}`};
        align-items: center;
    }

    li {
        display: block;
        font-size: ${({ theme }) => `${theme.gutter.md}`};
        flex-shrink: 0;
    }

    a {
        gap: ${({ theme }) => `${theme.gutter.xs}`};
        display: inline-flex;
        align-items: center;
        font-size: 1rem;
        word-break: keep-all;

        ${({ theme }) => css`
            padding: ${theme.gutter.xs} ${theme.gutter.sm};
        `}
    }

    @media (max-width: 830px) {
        position: absolute;
        box-sizing: border-box;
        width: min(80%, 700px);
        right: 0;
        top: 0;
        margin: -20px;
        padding: 75px 50px 50px;
        background: ${({ theme }) => theme.gray};
        -webkit-font-smoothing: antialiased;
        /* to stop flickering of text in safari */
        transform-origin: 0% 0%;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

        ul {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: flex-end;
            padding-top: ${({ theme }) => theme.gutter.xl};
        }

        li {
            > a {
                font-size: 1.2rem;
                padding: ${({ theme }) => theme.gutter.md};
                color: ${({ theme }) => theme.grafitiWhite};
                font-weight: 500;
            }
        }
    }

    @media (min-width: 831px) {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-end;

        ul {
            display: flex;
            padding: 0;
        }
    }

    &.opened {
        transform: translateX(0);
    }
`

const MenuContainer = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #232323;
    color: #cdcdcd;
    padding: 20px;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
    box-sizing: border-box;

    a {
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
            color: #00C6A7;
        }
    }

    label input {
        display: block;
        width: 35px;
        height: 25px;
        margin: 0;
        position: absolute;
        cursor: pointer;
        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */
        -webkit-touch-callout: none;

        &:checked ~ span {
            opacity: 1;
            transform: rotate(45deg) translate(3px,-1px);
        }

        &:checked ~ span:nth-child(3) {
            transform: rotate(-45deg) translate(-5px,11px);
        }

        &:checked ~ span:nth-child(4) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
        }
    }

    span {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        background: #cdcdcd;
        border-radius: 3px;
        z-index: 1;
        transform-origin: 4px 0px;
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;

        &:first-child {
            transform-origin: 0% 0%;
        }

        &:nth-child(3) {
            transform-origin: 0% 100%;
        }
    }

    @media (max-width: 830px) {
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    @media (min-width: 831px) {
        width: 100%;

        a {
            color: #cdcdcd;
        }

        input {
            display: none;
        }

        span {
            display: none;
        }
    }
`
