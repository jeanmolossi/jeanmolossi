import Link from 'next/link';
import { FiMenu, FiXCircle } from 'react-icons/fi'
import { menuItems } from '@/config/routes';
import { useChildCounter } from '@/presentation/hooks';
import { useModal } from '@/presentation/hooks';
import { Logo } from '../logo';
import * as S from './styles';
import { RenderIf, SwapComponents } from '@/presentation/helpers';


export const Navbar = () => {
    const [isOpen, onClose, onOpen] = useModal();
    const next = useChildCounter();

    return (
        <S.NavbarContainer>
            <S.Navbar>
                <div>
                    <Logo />

                    <SwapComponents
                        condition={isOpen}
                        componentIfConditionFalse={
                            <S.OpenMenu onClick={onOpen}>
                                <FiMenu />
                            </S.OpenMenu>
                        }
                        componentIfConditionTrue={
                            <S.CloseIcon onClick={onClose}>
                                <FiXCircle />
                            </S.CloseIcon>
                        }
                    />
                </div>
                
                <S.NavList isOpen={isOpen}>
                    <RenderIf condition={isOpen}>
                        <Logo />
                    </RenderIf>
                    {menuItems.map(({ href, label, icon: Icon }, i) => (
                        <S.NavbarItem isOnScreen={isOpen} child={next()} key={i.toString()}>
                            <Link href={href} passHref>
                                <S.NavbarLink onClickCapture={onClose}>
                                    <Icon />
                                    {label}
                                </S.NavbarLink>
                            </Link>
                        </S.NavbarItem> 
                    ))}
                </S.NavList>
            </S.Navbar>
        </S.NavbarContainer>
    );
}