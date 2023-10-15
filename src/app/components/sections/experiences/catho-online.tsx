import Timeline from '../timeline/timeline';
import styles from './experiences.module.css'
import { techSearch, Tech } from './helpers';
import { Skills } from './skills';

export default function Khube() {
    const tags = [
        {
            tech: 'HTML5',
            usageFrequency: 45
        },
        {
            tech: 'CSS3',
            usageFrequency: 45
        },
        {
            tech: 'Javascript',
            usageFrequency: 68
        },
        {
            tech: 'Typescript',
            usageFrequency: 80
        },
        {
            tech: 'Node.js',
            usageFrequency: 76
        },
        {
            tech: 'React',
            usageFrequency: 90
        },
        {
            tech: 'jest',
            usageFrequency: 86
        },
        {
            tech: 'cypress',
            usageFrequency: 86
        },
        {
            tech: 'PHP',
            usageFrequency: 57
        },
        {
            tech: 'mysql',
            usageFrequency: 84
        },
        {
            tech: 'go lang',
            usageFrequency: 98
        },
        {
            tech: 'Docker',
            usageFrequency: 98
        },
        {
            tech: 'amazon web services',
            usageFrequency: 98
        },
        {
            tech: 'Shell',
            usageFrequency: 70
        },
        {
            tech: 'ubuntu',
            usageFrequency: 100
        },
        {
            tech: 'Gulp',
            usageFrequency: 10
        },
        {
            tech: 'jquery',
            usageFrequency: 10
        },
        {
            tech: 'Sass',
            usageFrequency: 50
        },
        {
            tech: 'terraform',
            usageFrequency: 89
        },
        {
            tech: 'Github',
            usageFrequency: 100
        },
        {
            tech: 'Confluence',
            usageFrequency: 100
        },
        {
            tech: 'Jira',
            usageFrequency: 100
        },

        {
            tech: 'slack',
            usageFrequency: 100
        },
        {
            tech: 'figma',
            usageFrequency: 41
        },
    ] as const;

    const skills = tags
        .reduce((acc, tag) => {
            const tech = techSearch(tag.tech);

            if (!!tech) {
                acc.push({
                    ...tech,
                    usageFrequency: tag.usageFrequency
                })
            }

            return acc
        }, [] as Array<Tech>)
        .sort((a, b) => b.usageFrequency - a.usageFrequency);

    return (
        <div className={styles.content}>
            <p>
                Desenvolvo aplicações de grande porte.
                Atuo, como Desenvolvedor Sênior utilizando diversas techs,
                dentre elas, as principais são <b>Golang</b>, <b>Javascript</b>, <b>Typescript</b> e <b>PHP</b>.
            </p>

            <p>
                Trabalho no time responsável pelo serviço de vagas e integração com
                parceiros ATS. <br />
                Realizando processo de <b>Code review</b> das implementações do
                time e auxiliando os devs com melhores práticas e
                inovações de mercado, criando as documentações necessárias dos
                projetos, monitorando a saúde dos sistemas e, a parte mais divertida,
                codificando.
            </p>

            <p>
                Auxiliei no processo de desenvolvimento dos novos integrantes
                do time atuando como mentor em um programa chamado{' '}
                <a
                    href="https://www.catho.com.br/carreira-sucesso/projeto-develas/"
                    target='_blank'
                >
                    Devel{'{as}'}
                </a>. Um programa de inclusão feminina da empresa.
            </p>

            <p>
                Minhas atribuições incluem intermediar a solução de problemas/novos produtos
                no formato <b>cross team</b>, propor soluções para a empresa como um todo,
                oferecer soluções de produtos que vão além dos produtos em que a
                equipe atua, focado no negócio e não somente no produto.
            </p>

            <Timeline
                className='py-8 px-0'
                header="Minha carreira na Catho"
                items={[
                    {
                        heading: 'Desenvolvedor Pleno',
                        subheading: 'Maio de 2021',
                        content: (
                            <>
                                Iniciei minha carreira na Catho Online,
                                como desenvolvedor pleno
                            </>
                        )
                    },
                    {
                        heading: 'Desenvolvedor Sênior',
                        subheading: 'Agosto de 2022 - Momento',
                        content: (
                            <>
                                Fui promovido a desenvolvedor sênior, com
                                excelentes indicadores de performance.
                            </>
                        )
                    },
                ]}
            />

            <h4 className='text-md font-medium'>Frequência de atividade por tech:</h4>

            <Skills skills={skills} />
        </div>
    )
}
