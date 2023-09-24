import styles from './styles.module.css';

export default function Timeline() {
    return (
        <section className={styles.wrapper}>
            <h1 className='text-2xl mb-8'>Experiência profissional</h1>

            <div className={styles.timeline}>
                <Item left>
                    <h3>Khube</h3>
                    <p>Desenvolvedor fullstack</p>
                </Item>

                <Item>
                    <h3>Khube</h3>
                    <p>Desenvolvedor fullstack</p>
                </Item>

                <Item left>
                    <h3>Catho Online</h3>
                    <p>Desenvolvedor fullstack</p>
                </Item>
            </div>
        </section>
    )
}

function Item({ left = false, children }: any) {
    if (left) {
        return (
            <>
                <Empty />
                <Middle />
                <Content>
                    {children}
                </Content>
            </>
        )
    }

    return (
        <>
            <Content>
                    {children}
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
