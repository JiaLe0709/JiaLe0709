import { useEffect, useState } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"

async function getRandomImages() {
    const res = await fetch("https://beans-1.jiale.in/list")
    const images = await res.json()

    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[images[i], images[j]] = [images[j], images[i]]
    }

    return images.slice(0, 6)
}

export default function GalleryStack() {
    const [images, setImages] = useState([])

    useEffect(() => {
        getRandomImages().then(setImages)
    }, [])

    return (
        <section id="photos">
            <div className="columns-2 gap-4 sm:columns-3 ">
                {images.map((imageUrl, idx) => (
                    <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                        <img
                            className="mb-4 size-full rounded-lg object-cover"
                            src={`https://beans-1.imglab-cdn.net/${imageUrl}`}
                            alt={`Random image ${idx + 1}`}
                            onError={(e) => {
                                e.currentTarget.src = 'https://jiale.imglab-cdn.net/favicon.png?format=avif'
                            }}
                        />
                    </BlurFade>
                ))}
            </div>
        </section>
    )
}
