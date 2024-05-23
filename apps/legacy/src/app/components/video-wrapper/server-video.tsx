import styles from './video-wrapper.module.css';

export async function VideoComponent({ videoId }: { videoId: string }) {
    const url = new URLSearchParams()

    Object.entries({
        origin: "https://jeanmolossi.com.br",
        autoplay: '0',
        start: '0',
    }).forEach(([key, value]) => url.append(key, value))

    const embedSrcWithConfigs = `https://www.youtube.com/embed/${videoId}?${url.toString()}`

    return (
        <div className={styles.video_wrapper}>
            <iframe
                className="video-iframe aspect-video border-none"
                src={embedSrcWithConfigs}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
}
