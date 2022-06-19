import React from "react";
import Link from "next/link";
import Image, { ImageLoader } from "next/image";
import { FiBookOpen, FiEye, FiHeart } from "react-icons/fi";
import { RenderIf } from "@/presentation/helpers";
import { ArticleProps } from "../../article";
import * as S from "./styles"

const cdnLoader: ImageLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality}`;

export const ArticleExcerpt = React.memo(({ article }: ArticleProps) => {
    return (
        <Link href="/artigo/[slug]" as={`/artigo/${article.slug}`} passHref>
            <S.ArticleItem>
                <RenderIf condition={!!article.cover_image}>
                    <S.ArticleCover>
                        <div>
                            <Image
                                loader={cdnLoader}
                                alt={`Imagem de capa para o artigo ${article.title}`}
                                loading="lazy"
                                layout="responsive"
                                objectFit="cover"
                                src={{
                                    src: article.cover_image,
                                    width: 1280,
                                    height: 720
                                }}
                            />
                        </div>
                    </S.ArticleCover>
                </RenderIf>

                <S.Excerpt>
                    <h1>{article.title}</h1>

                    <S.ArticleAuthor>
                        <S.AuthorPhoto>
                            <Image
                                loader={cdnLoader}
                                alt={`Foto de perfil do autor ${article.user.name}`}
                                loading="lazy"
                                objectFit="cover"
                                src={{
                                    src: article.user.profile_image_90,
                                    width: 90,
                                    height: 90
                                }}
                            />
                        </S.AuthorPhoto>

                        <S.AuthorDetails>
                            <span>{article.user.name}</span>
                            <small>Publicado {article.published_at.toRelativeTime()}</small>
                            <span>Aprox. {article.reading_time_minutes} minutos de leitura</span>
                        </S.AuthorDetails>
                    </S.ArticleAuthor>


                    <h2>{article.description}</h2>

                    <S.Reactions>
                        <div>
                            <span><FiHeart /> {article.public_reactions_count.compress()}</span>
                            <span><FiEye /> {article.page_views_count.compress()}</span>
                        </div>
                    </S.Reactions>

                    <S.ArticleLink>
                        <FiBookOpen />
                        Veja artigo completo
                    </S.ArticleLink>
                </S.Excerpt>
            </S.ArticleItem>
        </Link>
    )
})
