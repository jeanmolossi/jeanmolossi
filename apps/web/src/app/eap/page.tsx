import { Benefits } from "./sections/benefits";
import { Contents } from "./sections/contents";
import { Guarantee } from "./sections/guarantee";
import { HeroSection } from "./sections/hero";
import { LastCallToAction } from "./sections/last-call-to-action";

export default function EapPage() {
    return (
        <div className="text-white">
            <HeroSection />
            <Contents />
            <Benefits />
            <Guarantee />
            <LastCallToAction />
        </div>
    )
}
