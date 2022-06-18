import React, { ReactNode, useEffect, useState } from 'react'
import Canvas from '@/presentation/components/canvas';
import { Navbar } from '../navbar';
import { MainContainer } from './styles'

interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined')
            setCanShow(typeof window !== 'undefined')
    }, [])

    return (
        <div style={{ backgroundColor: 'black'}} >
            {/* {canShow ? <Canvas /> : null} */}
            <MainContainer>
                {children}

                <Navbar />
            </MainContainer>
        </div>
    )
}
