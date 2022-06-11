import { theme } from "@/presentation/styles";
import { P5Instance } from "react-p5-wrapper";

export function sketch(p5: P5Instance) {
    let waves: Wave[] = [];
    let waveAmount = 4;
    let waveProperties = {
        xspacing: 1,
        w: null as any as number,
        theta: 0.0,
        amplitude: 10.0,
        period: null as any as number,
        dx: null as any as number,
        yvalues: null as any as number[],
        alpha: 1,
    };

    let yPosition = 1.06;
    let xPosition = variantXPos();

    type Wave = typeof waveProperties;

    p5.windowResized = (e) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight, false);
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.P2D);

        for (let i = 0; i < waveAmount; i++) {
            let wave = Object.assign({}, waveProperties);
            wave.period = 350 * (i / 4 + 1);
            wave.w = p5.width + 2;
            wave.alpha = ((i + 1) * 100) / waveAmount / 100;
            wave.dx = (p5.TWO_PI / wave.period) * 1 * wave.xspacing;
            wave.yvalues = new Array(p5.floor(wave.w / wave.xspacing));
            waves.push(wave);
        }

        p5.smooth();
    };

    p5.draw = () => {
        p5.clear(0, 0, 0, 1);
        p5.strokeWeight(2.5);
        p5.fill(theme.lightGreen);
        p5.circle(3 + xPosition, p5.windowHeight / yPosition, 4);

        waves.forEach((wave) => {
            calcWave(wave);
            renderWave(wave);
        });
    };

    const calcWave = (wave: Wave) => {
        wave.theta -= 0.013;

        // For every x value, calculate a y value with sine function
        let x = wave.theta;
        for (let i = 0; i < wave.yvalues.length; i++) {
            wave.yvalues[i] = p5.sin(x) * ((i * wave.amplitude) / 100);
            // x += wave.dx;
            x += wave.dx - i * 0.00001;
            // x += wave.dx + i * .00002;
        }
    };

    const renderWave = (wave: Wave) => {
        p5.fill(`${theme.lightGreen}04`);
        p5.beginShape();
        p5.stroke(p5.color(`rgba(69, 229, 183, ${wave.alpha})`));
        p5.strokeWeight(1);

        p5.vertex(0 + xPosition, p5.height / yPosition + wave.yvalues[0]);
        for (let x = 0; x < wave.yvalues.length; x += 2) {
            p5.bezierVertex(
                x * wave.xspacing + xPosition,
                p5.height / yPosition + wave.yvalues[x],
                (x + 1) * wave.xspacing + xPosition,
                p5.height / yPosition + wave.yvalues[x + 1],
                (x + 2) * wave.xspacing + xPosition,
                p5.height / yPosition + wave.yvalues[x + 2]
            );
        }

        p5.endShape();
    };
}

function variantXPos() {
    if (window.innerWidth > window.innerHeight) {
        return window.innerWidth / 2;
    }

    return 0;
}
