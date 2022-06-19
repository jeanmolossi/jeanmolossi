import React from "react"
import { SiGithub, SiTwitter, SiLinkedin, SiYoutube, SiTelegram, SiInstagram } from "react-icons/si"
import { social } from "@/config/constants"
import * as S from './styles'

export const SocialLinks = React.memo(() => {
    return (
        <S.SocialWrapper>
            <SocialLink className="github" withBgWhite>
                <SiGithub />
            </SocialLink>

            <SocialLink className="twitter">
                <SiTwitter />
            </SocialLink>

            <SocialLink className="linkedin" withBgWhite>
                <SiLinkedin />
            </SocialLink>

            <SocialLink className="youtube" withBgWhite>
                <SiYoutube />
            </SocialLink>

            <SocialLink className="telegram" withBgWhite>
                <SiTelegram />
            </SocialLink>

            <SocialLink className="instagram">
                <SiInstagram />
            </SocialLink>
        </S.SocialWrapper>
    )
})

interface SocialLinkProps {
    className: keyof typeof social
    withBgWhite?: boolean
    children?: React.ReactNode
}

const SocialLink = ({ className, withBgWhite, children }: SocialLinkProps) => {
    const classes = [
        className,
        withBgWhite ? 'withBgWhite' : '',
    ].filter(Boolean).join(' ')

    return (
        <a
            className={classes}
            href={social[className]}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </a>
    )
}
