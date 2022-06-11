import { ReactP5Wrapper } from 'react-p5-wrapper'
import { sketch } from './sketches/hex';
import { CanvasOverlay } from './styles';

export default function Canvas() {
    return (
        <CanvasOverlay>
            <ReactP5Wrapper sketch={sketch} />
        </CanvasOverlay>
    )
}

