import Link from 'next/link'
import * as S from './styles'

export const Logo = () => {
    return (
        <Link href="/" passHref>
            <a>
                <S.Heading>
                    Jean Molossi
                    <small>Fullstack Software Developer</small>
                </S.Heading>
            </a>
        </Link>
    )
}