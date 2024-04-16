import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

interface LayoutProps extends PropsWithChildren {}

const Layout = ({ children }: LayoutProps) => {
    const year = (new Date()).getFullYear()
    return (
        <>
            {children}

            <div className={'text-center pt-10 pb-6 bg-neutral-800 text-white'}>
                <p>Todos os direitos reservados &copy; {year}</p>
            </div>
        </>
    )
}

export default Layout

export const metadata: Metadata = {
    title: 'Ebook | Alavancagem de carreira',
    description: 'Descubra os segredos para construir uma base sólida, dominar habilidades técnicas e alcançar o sucesso profissional no mundo da programação.'.trimAfter(150)
}
