import React from "react"
import { SiGithub, SiTwitter, SiLinkedin, SiYoutube, SiTelegram, SiInstagram } from "react-icons/si"
import { social } from "@/config/constants"
import styles from './styles.module.css'

export const SocialLinks = React.memo(() => {
    return (
        <div className={styles.social_wrapper}>
            <SocialLink linkto="github" className={styles.github} withBgWhite>
                <SiGithub />
            </SocialLink>

            <SocialLink linkto="twitter" className={styles.twitter}>
                <SiTwitter />
            </SocialLink>

            <SocialLink linkto="linkedin" className={styles.linkedin} withBgWhite>
                <SiLinkedin />
            </SocialLink>

            <SocialLink linkto="youtube" className={styles.youtube} withBgWhite>
                <SiYoutube />
            </SocialLink>

            <SocialLink linkto="telegram" className={styles.telegram} withBgWhite>
                <SiTelegram />
            </SocialLink>

            <SocialLink linkto="instagram" className={styles.instagram}>
                <SiInstagram />
            </SocialLink>
        </div>
    )
})

interface SocialLinkProps {
    linkto: keyof typeof social
    className: string;
    withBgWhite?: boolean
    children?: React.ReactNode
}

const SocialLink = ({ linkto, className, withBgWhite, children }: SocialLinkProps) => {
    const classes = [
        className,
        withBgWhite ? 'withBgWhite' : '',
    ].filter(Boolean).join(' ')

    return (
        <a
            className={classes}
            href={social[linkto]}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}
