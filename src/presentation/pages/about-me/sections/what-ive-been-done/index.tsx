import { useChildCounter, useOnScreen } from '@/presentation/hooks';
import { useRef } from 'react';
import * as S from './styles'
import { techs, tools, others } from './techonologies';


export const WhatIveBeenDone = () => {
    const techlistRef = useRef<HTMLUListElement>(null);
    const toollistRef = useRef<HTMLUListElement>(null);
    const otherlistRef = useRef<HTMLUListElement>(null);

    const [ isTechListOnScreen ] = useOnScreen(techlistRef)
    const [ isToolListOnScreen ] = useOnScreen(toollistRef)
    const [ isOtherListOnScreen ] = useOnScreen(otherlistRef)

    const nextTech = useChildCounter()
    const nextTool = useChildCounter()
    const nextOther = useChildCounter()

    return (
        <S.Section>
            <S.Heading>O que já fiz ?</S.Heading>

            <S.Column id='techs'>
                <h1>Techs do meu arsenal</h1>

                <S.TechList ref={techlistRef}>
                    {techs.map((tech, i) => (
                        <S.TechListItem
                            key={i.toString()}
                            child={nextTech()}
                        >
                            <a href={tech.href}>
                                <S.TechListItemIcon color={tech.color}>
                                    <tech.icon />
                                </S.TechListItemIcon>

                                <S.TechListItemText>
                                    {tech.alt}
                                </S.TechListItemText>
                            </a>
                        </S.TechListItem>
                    ))}
                </S.TechList>
            </S.Column>

            <S.Column id='tools'>
                <h1>Tools do meu arsenal</h1>

                <S.TechList ref={toollistRef}>
                    {tools.map((tool, i) => (
                        <S.TechListItem
                            key={i.toString()}
                            child={nextTool()}
                        >
                            <a href={tool.href} target="_blank">
                                <S.TechListItemIcon color={tool.color}>
                                    <tool.icon />
                                </S.TechListItemIcon>

                                <S.TechListItemText>
                                    {tool.alt}
                                </S.TechListItemText>
                            </a>
                        </S.TechListItem>
                    ))}
                </S.TechList>
            </S.Column>

            <S.Column>
                <h1>Outras 'coisas' que também tenho experiência</h1>

                <S.TechList ref={otherlistRef}>
                    {others.map((other, i) => (
                        <S.TechListItem
                            key={i.toString()}
                            child={nextOther()}
                        >
                            <a href={other.href} target="_blank">
                                <S.TechListItemIcon color={other.color}>
                                    <other.icon />
                                </S.TechListItemIcon>

                                <S.TechListItemText>
                                    {other.alt}
                                </S.TechListItemText>
                            </a>
                        </S.TechListItem>
                    ))}
                </S.TechList>
            </S.Column>

            <S.Column>
                <h1>Como cheguei nisso ?</h1>
                <br />

                <p>Minha história com programação começa lá aos 9 anos de idade. Lá, quando tive meu primeiro contato com um computador. Um incrível celeron 800Mhz de processamento e incríveis 128 MB de memória.</p>
                <br />
                <p>Eu criei interesse por computadores quando descobri que eu poderia jogar diferentes jogos neles.</p>
                <br />
                <p>
                    Eu assistia aqueles filmes sobre hackers, programadores, empresas de tecnologia e achava aquilo incrível! Anos depois, fiz a simples pesquisa
                    <a href="https://www.google.com/search?q=como+me+tornar+um+hacker&oq=como+me+tornar+um+hacker&aqs=chrome..69i57.3757j0j1&sourceid=chrome&ie=UTF-8" target="_blank">
                        {' '}como me tornar um hacker,{' '}
                    </a>
                    até que cheguei em um portal com vídeo aulas sobre PHP.
                </p>
                <br />
                <p>A partir desse momento, comecei a aprender <a href="#techs">PHP, HTML e CSS</a> que na época era só CSS não CSS3 como é hoje.</p>
                <br />
                <p>Desde então, me aprofundei cada vez mais, aprendi sobre comunicação entre sistemas, padrões de projeto, arquitetura de software, resiliência, etc.</p>
                <br />
                <p>Pulando para os dias de hoje, trabalho com grande parte das tecnologias que coloquei no meu arsenal. Em suma, 90% delas estão presentes ativamente em meu cotidiano.</p>
                <br />
            </S.Column>
        </S.Section>
    )
}
