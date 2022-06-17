import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic';
// import Canvas from '@/presentation/components/canvas';
import { Navbar } from '../navbar';
import { MainContainer } from './styles'

const Canvas = dynamic<any>(
    () => import('@/presentation/components/canvas'),
    { loading: () => <div>Loading...</div>, ssr: false, },
) as React.FunctionComponent;

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
