import styles from './experiences.module.css'
import { Skills } from './skills'
import { Tech, techSearch } from './helpers';

export default function InformaticCenter() {
    const tags = [
        {
            tech: 'HTML5',
            usageFrequency: 100
        },
        {
            tech: 'CSS3',
            usageFrequency: 100
        },
        {
            tech: 'Javascript',
            usageFrequency: 88
        },
        {
            tech: 'PHP',
            usageFrequency: 90
        },
        {
            tech: 'MySQL',
            usageFrequency: 70
        },
        // Tools
        {
            tech: 'Shell',
            usageFrequency: 30
        },
        {
            tech: 'Gulp',
            usageFrequency: 50
        },
        {
            tech: 'jquery',
            usageFrequency: 60
        },
        {
            tech: 'Sass',
            usageFrequency: 50
        },
        {
            tech: 'Wordpress',
            usageFrequency: 83
        },
        {
            tech: 'Github',
            usageFrequency: 10
        },
    ] as const;

    const skills = tags.reduce((acc, tag) => {
        const tech = techSearch(tag.tech);

        if (!!tech) {
            acc.push({
                ...tech,
                usageFrequency: tag.usageFrequency
            })
        }

        return acc
    }, [] as Array<Tech>);

    return (
        <div className={styles.content}>
            <p>
                Desenvolvia websites para clientes utilizando WordPress.
                Além de também customizar temas e plugins usando <b>PHP</b>,
                Gulp, Sass, <b>Javascript</b>, jQuery, Ajax, etc.
            </p>

            <p>
                Fazia o atendimento e o brainstorm com os clientes para atender
                à necessidade dele da melhor forma possível.
            </p>

            <p>
                Era o responsável por desenvolver o layout do produto até a
                implementação do mesmo. <br />
                Intermediava a definição do layout com designers até que o
                desenho do produto estivesse dentro do esperado.
            </p>

            <p>
                Também era o responsável por implantar o projeto e mantê-lo ativo
            </p>

            <h3 className='text-md font-medium'>Frequência de atividade por tech:</h3>

            <Skills skills={skills} />
        </div>
    )
}
