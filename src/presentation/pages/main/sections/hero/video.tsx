import { isClientSide } from "@/presentation/helpers";
import { theme } from "@/presentation/styles";
import { MouseEvent, useCallback, useRef, useState } from "react"

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isOver, setIsOver] = useState(false);

    const prevent = (e: MouseEvent<HTMLVideoElement>) => {
        e.preventDefault();
    }

    const onMouseOver = useCallback((e: MouseEvent<HTMLVideoElement>) => setIsOver(true), [])
    
    const onMouseOut = useCallback((e: MouseEvent<HTMLVideoElement>) => {
        setIsOver(false)

        if (!videoRef.current || !isClientSide()) return;

        videoRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
        videoRef.current.style.boxShadow = `none`;
    }, [videoRef.current])
    
    const onMouseMove = useCallback((e: MouseEvent<HTMLVideoElement>) => {
        if (!isOver || !videoRef.current || !isClientSide()) return;

        const rotateDeg = 10;
        const shadowColor = `${theme.rust}20`
        const shadowSpread = 10;

        function rotate(axis: 'X' | 'Y', deg:number) {
            return `rotate${axis}(${deg}deg)`;
        }

        function transform(x: number, y: number) {
            return `${rotate('Y', x)} ${rotate('X', y*-1)}`;
        }

        function boxShadow(x: number, y: number) {
            const xShadow = x > 0 ? x + 10 : x - 10;
            const yShadow = y > 0 ? y + 10 : y - 10;
            return `${xShadow * -1}px ${yShadow * -1}px ${shadowSpread}px ${shadowColor}`;
        }

        const wsize = Math.ceil(videoRef.current.clientWidth / 2);
        const hsize = Math.ceil(videoRef.current.clientHeight / 2);


        const mouseX = e.nativeEvent.offsetX
        const mouseY = e.nativeEvent.offsetY        

        const x = Math.round(((mouseX - wsize) / wsize) * rotateDeg);
        const y = Math.round(((mouseY - hsize) / hsize) * rotateDeg);

        videoRef.current.style.transform = transform(x, y);
        videoRef.current.style.boxShadow = boxShadow(x, y);
    }, [isOver, videoRef.current])


    return (
        <video
            ref={videoRef}
            src="/videos/Hud-22449_lg.mp4"
            autoPlay
            controlsList="nodownload"
            loop
            muted
            contextMenu="nofollow"
            onContextMenu={prevent}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseMove={onMouseMove}
        >
        </video>
    )
}

export default Video