import { cn } from "@/lib/helpers";
import Image from "next/image";

interface AuthorPicProps {
    src: string;
    className?: string;
    imgClassName?: string;
}

export default function AuthorPic({
    src,
    className,
    imgClassName,
}: AuthorPicProps) {
    return (
        <div className={cn('aspect-square overflow-hidden rounded-full relative w-12', className)}>
            <Image
                alt="Foto de perfil do autor"
                src={{
                    src,
                    width: 90,
                    height: 90,
                }}
                className={cn(' rounded-full', imgClassName)}
            />
        </div>
    )
}
