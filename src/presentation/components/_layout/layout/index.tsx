import { ReactNode } from 'react'
import dynamic from 'next/dynamic';
import { Navbar } from '../navbar';
import { MainContainer } from './styles'

const Canvas = dynamic(() => import('@/presentation/components/canvas'), { ssr: false })

interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  
    return (
        <>
            <Canvas />
            <MainContainer>
                {children}

                <Navbar />
            </MainContainer>
        </>
    )
}