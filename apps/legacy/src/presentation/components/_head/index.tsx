import React, { useMemo } from "react"
import Head from "next/head";
import logger from "@/config/logger/logger";
import { RenderIf } from "@/presentation/helpers";
import { FontLoader } from "@/presentation/scripts";

interface OgSeo {
    type: 'article' | 'page'
    url: string;

    updated_time?: string;
    image?: Array<string>;
}

export enum Robots {
    /** @property {enum} index indexe esta página - exiba-a em seus resultados de busca */
    index = 'index',
    /** @property {enum} noindex não indexe esta página - não a exiba nos resultados de busca. Útil para páginas como de login e acesso à intranet */
    noindex = 'noindex',
    /** @property {enum} follow siga os links desta página para descobrir novas páginas */
    follow = 'follow',
    /** @property {enum} nofollow nenhum dos links desta página deve ser seguido */
    nofollow = 'nofollow',
    /** @property {enum} nosnippet orienta o site de busca a não exibir a descrição da página nos resultados de busca */
    nosnippet = 'nosnippet',
    /** @property {enum} noodp orienta o Google não utilizar a descrição do diretório DMOZ em seus resultados (snippet) */
    noodp = 'noodp',
    /** @property {enum} noarchive instrui o Google a não exibir a versão em cache da página */
    noarchive = 'noarchive',
    /** @property {enum} noimageindex não indexe nenhuma imagem da página */
    noimageindex = 'noimageindex',
}

export interface SeoProps {
    title: string;
    description: string;
    og?: OgSeo
    robots?: Robots[]
    canonical?: string;
}

export const BaseHead = ({
    title,
    description,
    og,
    robots = [Robots.index,Robots.follow],
    canonical = '/'
}: SeoProps) => {
    const builtTitle = useMemo(() => stripLongTitle(title), [title])

    const ogTag = useMemo(() => initOgSeo(og), [og]);

    const robotsConfig = useMemo(() => robots.join(','), [robots])

    const canonicalUrl = useMemo(() => `https://jeanmolossi.com.br${canonical}`, [canonical])

    return (
        <Head>
            <title>{builtTitle}</title>

            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="description" content={description.trimAfter(160)} />
            <link rel="canonical" href={canonicalUrl} />
            <link rel="publisher" href={canonicalUrl}/>

            <meta property="og:locale" content="pt_BR" />
            <meta property="og:type" content={ogTag.type} />
            <meta property="og:title" content={builtTitle} />
            <meta property="og:description" content={description.trimAfter(160)} />
            <meta property="og:url" content={ogTag.url} />
            <meta property="og:site_name" content="Jean Molossi - Fullstack Software Developer" />

            <RenderIf condition={Boolean(ogTag.updated_time)}>
                <meta property="og:updated_time" content={ogTag.updated_time} />
            </RenderIf>

            {/* META IMAGES */}
            {ogTag.image?.map((img, key) => (
                <React.Fragment key={key}>
                    <meta property="og:image" content={img} />
                    <meta property="og:image:secure_url" content={img} />
                </React.Fragment>
            ))}
            {/* META IMAGES */}

            <meta name="twitter:title" content={builtTitle} />
            <meta name="twitter:description" content={description.trimAfter(160)} />
            <meta name="twitter:image" content={ogTag.image?.[0]} />
            <meta name="twitter:site" content="https://jeanmolossi.com.br/" />
            <meta name="twitter:creator" content="@jeanmolossi" />

            <meta name="robots" content={robotsConfig} />
            <link rel="icon" href="/favicon.ico" />

            <FontLoader />
        </Head>
    )
}

export const initOgSeo = (override: Partial<OgSeo> = {}): OgSeo => {
    return {
        type: 'page',
        url: 'https://jeanmolossi.com.br/',
        ...override
    }
}

export function stripLongTitle(title: string): string {
    const tail = 'Jean Molossi Fullstack Developer'
    const sentence = `${title} - ${tail}`;

    if (title.length > 60) {
        logger.error('your title tag is up to 60 characters')
        return title.trimAfter(61)
    }

    if (sentence.length > 60) {
        return title;
    }

    return sentence
}
