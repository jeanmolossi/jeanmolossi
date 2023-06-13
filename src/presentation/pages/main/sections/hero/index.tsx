import Image from "next/image";
import styles from './styles.module.css'

export function HeroSection() {
    return (
        <div className="bg-neutral-800 p-4 w-full inline-flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="my-auto px-4">
                    <h1>Alcance o <span className="text-orange-500">sucesso</span>, desvende o potencial <span className="text-orange-500">ilimitado</span> da sua ideia!</h1>
                    <h2 className="font-normal text-gray-400 leading-5">
                        Construa um futuro inovador com soluções exclusivas, projetadas
                        para impulsionar seus objetivos e superar todas as expectativas!
                    </h2>
                </div>

                <div>
                    <div className={styles.image_wrapper}>
                        <Image
                            alt="avatar"
                            src={{
                                src: "/images/avatar-posing.png",
                                height: 400,
                                width: 400
                            }}
                            sizes={['(min-width: 830px) 360px'].join(',')}
                            style={{ objectFit: 'cover', marginBottom: '-16px' }}
                            fill
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
