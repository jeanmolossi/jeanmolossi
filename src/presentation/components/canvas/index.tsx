import { useEffect, useState } from 'react';
import { sketch } from './sketches/hex';
import { CanvasOverlay } from './styles';

const Canvas = () => {
    const [Wrapper, setWrapper] = useState<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const { ReactP5Wrapper } = require('react-p5-wrapper');

        setWrapper(<ReactP5Wrapper sketch={sketch} />)
    }, [])

    return (
        <CanvasOverlay>
            {Wrapper}
        </CanvasOverlay>
    )
}

export default Canvas;
