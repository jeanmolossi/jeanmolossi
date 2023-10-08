import styles from './experiences.module.css'
import { techSearch, Tech } from './helpers';
import { Skills } from './skills';

export default function Khube() {
    const tags = [
        {
            tech: 'HTML5',
            usageFrequency: 92
        },
        {
            tech: 'CSS3',
            usageFrequency: 92
        },
        {
            tech: 'Javascript',
            usageFrequency: 81
        },
        {
            tech: 'Typescript',
            usageFrequency: 96
        },
        {
            tech: 'Node.js',
            usageFrequency: 86
        },
        {
            tech: 'React',
            usageFrequency: 90
        },
        {
            tech: 'jest',
            usageFrequency: 68
        },
        {
            tech: 'cypress',
            usageFrequency: 61
        },
        {
            tech: 'PHP',
            usageFrequency: 10
        },
        {
            tech: 'postgresql',
            usageFrequency: 32
        },
        {
            tech: 'Docker',
            usageFrequency: 66
        },
        {
            tech: 'amazon web services',
            usageFrequency: 27
        },
        {
            tech: 'Firebase',
            usageFrequency: 70
        },
        {
            tech: 'Shell',
            usageFrequency: 70
        },
        {
            tech: 'ubuntu',
            usageFrequency: 44
        },
        {
            tech: 'nestjs',
            usageFrequency: 46
        },
        {
            tech: 'Gulp',
            usageFrequency: 10
        },
        {
            tech: 'jquery',
            usageFrequency: 30
        },
        {
            tech: 'Sass',
            usageFrequency: 80
        },
        {
            tech: 'webpack',
            usageFrequency: 33
        },
        {
            tech: 'terraform',
            usageFrequency: 15
        },
        {
            tech: 'Github',
            usageFrequency: 35
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
            tech: 'bitbucket',
            usageFrequency: 65
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
                Desenvolvi sistemas web completos, desde <b>Frontend</b> até os
                serviços de <b>Backend</b>.
                Utilizei majoritariamente NodeJS no Backend e ReactJS no
                Frontend.
            </p>

            <p>
                Era responsável por manter o produto, code review e auxiliava outros
                devs dentro do time. Atuei, essencialmente, como desenvolvedor
                mas também era a refência do time para sanar dúvidas ou auxiliar
                em <em>pair programming</em>.
            </p>

            <p>
                Entrava em <em>meetings</em> com clientes
                para entender a necessidade e seguir com o desenvolvimento do produto.
            </p>

            <p>
                Iniciei minha carreira na Khube como desenvolvedor Pleno e
                encerrei como Sênior
            </p>

            <h2 className='text-2xl font-medium'>Maiores contribuições</h2>

            <h3 className='text-xl font-medium'>Global Intervention</h3>

            <p>
                Quando comecei a atuar na <b>Khube</b> havia o app {' '}
                <a
                    target='_blank'
                    href="https://www.globalintervention.app/?utm_source=https://jeanmolossi.com.br"
                >
                        Global Intervention
                    </a>,
                um app inteiramente construído utilizando <b>React Native</b> e <b>Firebase</b>.
            </p>

            <p>
                Na época, o app apresentava diversos <em>bugs</em>, utilizava Javascript
                e praticamente não possuia documentação. <br />
                Fui o responsável por refatorar o app para uma versão utilizando Typescript,
                que acelerou muito o desenvolvimento do app pelo time. Além de que também,
                reduziu drásticamente a quantidade de <em>bugs</em> que ocorriam.
            </p>

            <h3 className='text-xl font-medium'>Aeroporto Catarina</h3>

            <p>
                Outra grande contribuição que me deixa com sentimento de dever cumprido
                foi um sistema interno de gestão aeroportuária para o {' '}
                <a
                    target='_blank'
                    href="https://jhsf.com.br/aeroporto-executivo-catarina/?utm_source=https://jeanmolossi.com.br"
                >
                    Aeroporto Catarina
                </a>.
            </p>

            <p>
                Dessa vez, atuei no desenvolvimento do backend do sistema que contou
                com diversas funcionalidades de gestão interna. <br />
                Auxiliei também no desenvolvimento do frontend, desde fazendo a
                integração com o backend até a construção de novos elementos da
                interface de usuário.
            </p>

            <p>
                Foi um projeto de grande porte em que tive a oportunidade de
                aprofundar meus conhecimentos em Clean Architecture, Clean Code.
            </p>

            <p>Ser um dos líderes de um projeto como esse me deixa muito entusiasmado</p>

            <h4 className='text-md font-medium'>Frequência de atividade por tech:</h4>

            <Skills skills={skills} />
        </div>
    )
}
