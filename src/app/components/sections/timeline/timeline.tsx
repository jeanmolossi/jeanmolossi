import styles from './styles.module.css';

export default function Timeline() {
    return (
        <section className={styles.wrapper}>
            <h1 className='text-2xl mb-8'>Experiência profissional</h1>

            <div className={styles.timeline}>
                <Item
                    heading='Informatic Center | Dev Fullstack'
                    period='De 2012 à 2017'
                    content={
                    <>
                        Desenvolvia websites para clientes utilizando WordPress.
                        Além de também customizar temas e plugins usando <b>PHP</b>,
                        Gulp, Sass, <b>Javascript</b>, jQuery, Ajax, etc.
                    </>
                    }
                />

                <Item
                    left
                    heading='Bokas Restaurante | Garçom'
                    period='De 2017 à 2020'
                    content={
                    <>
                        Trabalhando como garçom desenvolvi diversas habilidades
                        que melhoraram minha <b>comunicação</b> de forma clara
                        e objetiva.
                    </>
                    }
                />

                <Item
                    heading='Khube | Dev Fullstack'
                    period='De 2020 à 2021'
                    content={
                    <>
                        Desenvolvi sistemas web completos, desde <b>Frontend</b> até os
                        serviços de <b>Backend</b>.
                        Utilizei majoritariamente NodeJS no Backend e ReactJS no
                        Frontend
                    </>
                    }
                />

                <Item
                    left
                    heading='Catho Online | Dev Fullstack'
                    period='De 2021 - Atualmente'
                    content={
                    <>
                        Desenvolvo aplicações de <b>grande porte</b>. Atuo, como{' '}
                        <b>Desenvolvedor Sênior</b> utilizando diversas techs, dentre
                        elas, as principais são Golang, Javascript/Typescript e PHP.
                    </>
                    }
                />
            </div>
        </section>
    )
}

function Item({
    left = false,
    heading = null,
    period = null,
    content = null
}: any) {
    if (left) {
        return (
            <>
                <Empty />
                <Middle />
                <Content>
                    <h3>{heading}</h3>
                    <small>{period}</small>
                    <p>{content}</p>
                </Content>
            </>
        )
    }

    return (
        <>
            <Content>
                <h3>{heading}</h3>
                <small>{period}</small>
                <p>{content}</p>
            </Content>
            <Middle />
            <Empty />
        </>
    )
}

function Empty() {
    return <div className={styles.timeline_empty}></div>
}

function Middle() {
    return (
        <div className={styles.timeline_middle}>
            <div className={styles.timeline_circle}></div>
        </div>
    )
}

function Content({ children }: any) {
    return (
        <div className={styles.timeline_content}>{children}</div>
    )
}
