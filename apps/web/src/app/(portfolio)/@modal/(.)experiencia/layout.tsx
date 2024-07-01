import Modal from '@/app/components/modal/modal';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Modal>
            {children}
        </Modal>
    )
}
