import { P5Instance } from "react-p5-wrapper";

export function sketch(p5: P5Instance) {
    let w = p5.windowWidth,
        h = p5.windowHeight;

    let len = 20,
        count = 50,
        baseTime = 20,
        addedTime = 10,
        dieChance = 0.05,
        spawnChance = 1,
        sparkChance = 0.05,
        sparkDist = 10,
        sparkSize = 3;

    let color = (hue: number) => (light: number) => [hue, 255, light],
        baseLight = 50,
        addedLight = 10,
        shadowToTimePropMult = 6,
        baseLightInputMultiplier = 0.01,
        addedLightInputMultiplier = 0.02;

    let cx = w / 2,
        cy = h / 2,
        repaintAlpha: 0.04,
        hueChange = 0.1;

    let tick = 0,
        lines: Line[] = [],
        dieX = w / 2 / len,
        dieY = h / 2 / len;

    let baseRad = p5.TWO_PI / 6;

    p5.setup = function () {
        p5.createCanvas(w, h, p5.P2D);
        p5.fill(`black`);
        p5.rect(0, 0, w, h);
        p5.frameRate(60);

        p5.noSmooth();
        p5.colorMode(p5.HSB);
    };

    p5.draw = function () {
        ++tick;

        p5.drawingContext.globalCompositeOperation = "source-over";
        p5.drawingContext.shadowBlur = 0;
        p5.fill("rgba(0, 0, 0, 0.04)");
        p5.rect(0, 0, w, h);
        p5.drawingContext.globalCompositeOperation = "lighter";

        if (lines.length < count && Math.random() < spawnChance)
            lines.push(new Line());

        lines.forEach(function (line) {
            line.step();
        });
    };

    class Line {
        x: number;
        y: number;
        rad: number;

        addedX: number;
        addedY: number;

        time: number;
        targetTime: number;
        cumulativeTime: number;

        color: (light: number) => number[];
        lightInputMultiplier: number;

        constructor() {
            this.reset();
        }

        reset() {
            this.x = 0;
            this.y = 0;
            this.addedX = 0;
            this.addedY = 0;

            this.rad = 0;

            this.lightInputMultiplier =
                baseLightInputMultiplier +
                addedLightInputMultiplier * Math.random();

            this.color = color(tick * hueChange);
            this.cumulativeTime = 0;

            this.begin();
        }

        begin() {
            this.x += this.addedX;
            this.y += this.addedY;

            this.time = 0;
            this.targetTime = (baseTime + addedTime * Math.random()) | 0;

            this.rad += baseRad * direction();
            this.addedX = p5.cos(this.rad);
            this.addedY = p5.sin(this.rad);

            if (
                Math.random() < dieChance ||
                this.x >= dieX ||
                this.x < -dieX ||
                this.y >= dieY ||
                this.y < -dieY
            ) {
                this.reset();
            }
        }

        step() {
            ++this.time;
            ++this.cumulativeTime;

            if (this.time >= this.targetTime) this.begin();

            var prop = this.time / this.targetTime,
                wave = p5.sin(prop * p5.HALF_PI),
                x = this.addedX * wave,
                y = this.addedY * wave;

            p5.drawingContext.shadowBlur = prop * shadowToTimePropMult;
            var stepBaseLight =
                baseLight +
                addedLight *
                    p5.sin(this.cumulativeTime * this.lightInputMultiplier);

            let [hue, sat, lig] = this.color(stepBaseLight);

            p5.colorMode(p5.HSL);
            p5.fill(hue, sat, lig);

            let particleX = cx + (this.x + x) * 20,
                particleY = cy + (this.y + y) * 20;

            p5.ellipse(particleX, particleY, 4, 4);

            if (Math.random() < sparkChance) {
                let sparkVariant =
                        Math.random() * sparkDist * direction() - sparkSize / 2,
                    sparkX = particleX + sparkVariant,
                    sparkY = particleY + sparkVariant;

                p5.ellipse(sparkX, sparkY, sparkSize, sparkSize);
            }
        }
    }
}

function direction(): number {
    return Math.random() < 0.5 ? 1 : -1;
}
