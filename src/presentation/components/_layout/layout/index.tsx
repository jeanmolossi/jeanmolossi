import React, { ReactNode, Suspense } from 'react'
import Canvas from '@/presentation/components/canvas';
import { Navbar } from '../navbar';
import { MainContainer } from './styles'


interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Suspense fallback="Loading...">
                <Canvas />
            </Suspense>
            <MainContainer>
                {children}

                <Navbar />
            </MainContainer>
        </>
    )
}
