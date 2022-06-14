import LazyVideo from './video'
import * as S from './styles'
import { useRef } from 'react'
import { useOnScreen } from '@/presentation/hooks';
import Link from 'next/link';
import { getItem, menuItems } from '@/config/routes';
import { FiBook, FiChevronsDown } from 'react-icons/fi';


export const HeroSection = () => {
    const heroRef = useRef(null);

    const [isOnScreen] = useOnScreen(heroRef);

    return (
        <S.Section>
            <S.Content>
                <S.Hero ref={heroRef} isOnScreen={isOnScreen}>
                    <h1>Fullstack Software Developer</h1>
                    <h2>Impactante né?!</h2>

                    <p>Recentemente comecei a ensinar e você pode me acompanhar e aprender mais sobre esse mundo de Software Development (desenvolvimento de software).</p>

                    <Link passHref href={getItem('Sobre mim')}>
                        <S.LinkButton>
                            <FiBook /> Aprender
                        </S.LinkButton>
                    </Link>
                </S.Hero>

                <S.VideoWrapper>
                    <LazyVideo />
                </S.VideoWrapper>

                <S.ScrollDownButton href='#about-me'>
                    <FiChevronsDown size={32} />
                </S.ScrollDownButton>
            </S.Content>
        </S.Section>
    )
}