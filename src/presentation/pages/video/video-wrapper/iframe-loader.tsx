import { useMemo, useRef } from "react"

const IFrameLoader = ({ videoId }: { videoId: string }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const embedSrcWithConfigs = useMemo(() => {
        const url = new URLSearchParams()

        Object.entries({
            origin: "https://jeanmolossi.com.br",
            autoplay: '1',
            start: '0',
        }).forEach(([key, value]) => url.append(key, value))

        return `https://www.youtube.com/embed/${videoId}?${url.toString()}`
    }, [videoId]);

    return (
        <iframe
            ref={iframeRef}
            className="video-iframe"
            src={embedSrcWithConfigs}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    )
}

export default IFrameLoader
