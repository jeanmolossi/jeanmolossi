import React, { ReactNode } from 'react'
import { Navbar } from '../navbar';
import { MainContainer } from './styles'

interface LayoutProps {
    children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div style={{ backgroundColor: 'black'}} >
            <MainContainer>
                {children}

                <Navbar />
            </MainContainer>
        </div>
    )
}
