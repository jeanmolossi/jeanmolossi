import Image from "next/image";
import { getLastVideos } from "@/data/youtube/video";
import styles from './last-video.module.css';
import Link from "next/link";
import { ImYoutube } from "react-icons/im";

interface LastVideosProps {
    numVideos?: number;
    columns?: number;
}

export default async function LastVideos({
    numVideos = 4,
    columns = 4
}: LastVideosProps) {
    const videos = await getLastVideos(numVideos);

    return (
        <section className="max-w-7xl px-6 xl:p-0">
            <h1 className="text-3xl">Últimos vídeos</h1>

            <div
                className={[
                    styles.videos_wrapper,
                    // grid-cols-1
                    // grid-cols-2
                    // grid-cols-3
                    // grid-cols-4
                    // grid-cols-5
                    // grid-cols-6
                    // md:grid-cols-1
                    // md:grid-cols-2
                    // md:grid-cols-3
                    // md:grid-cols-4
                    // md:grid-cols-5
                    // md:grid-cols-6
                    // md:grid-cols-1
                    // lg:grid-cols-2
                    // lg:grid-cols-3
                    // lg:grid-cols-4
                    // lg:grid-cols-5
                    // lg:grid-cols-6
                    `grid-cols-1 md:grid-cols-${Math.round(columns/2)} lg:grid-cols-${columns}`,
                ].join(' ')}
            >
                {videos.map((video, i) => {
                    const href = `/video/${video.id.videoId}`

                    return (
                        <div
                            className={styles.video_container}
                            key={video.id.videoId}
                            style={{ animationDelay: `${100 * (i+5)}ms` }}
                        >
                            <h3 className="text-xl">{video.snippet.title}</h3>

                            <Link
                                href={href}
                                className={styles.video_thumbnail}
                            >
                                <Image
                                    src={{
                                        src: video.snippet.thumbnails.medium?.url!,
                                        width: video.snippet.thumbnails.medium?.width!,
                                        height: video.snippet.thumbnails.medium?.height!,
                                    }}
                                    alt={video.snippet.title}
                                    fill
                                />
                            </Link>

                            <small className="text-gray-400">
                                Publicado {video.snippet.publishedAt.toRelativeTime()}
                            </small>

                            <p>{video.snippet.description.trimAfter(80)}</p>

                            <Link href={href} className="flex items-center gap-2 self-end hover:underline">
                                <ImYoutube size={24} />
                                Assistir
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
