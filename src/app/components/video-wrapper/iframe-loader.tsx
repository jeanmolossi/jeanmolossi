const IFrameLoader = ({ videoId }: { videoId: string }) => {
    const url = new URLSearchParams()

    Object.entries({
        origin: "https://jeanmolossi.com.br",
        autoplay: '1',
        start: '0',
    }).forEach(([key, value]) => url.append(key, value))

    const embedSrcWithConfigs = `https://www.youtube.com/embed/${videoId}?${url.toString()}`

    return (
        <iframe
            className="video-iframe aspect-video border-none"
            src={embedSrcWithConfigs}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    )
}

export default IFrameLoader
