import { useEffect, useState } from "react"
import { BlurFade } from "@/components/magicui/blur-fade"

async function getRandomImages(images) {
    const shuffled = [...images]

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, 6)
}

export default function GalleryStack({ imageList }) {
    const [images, setImages] = useState([])
    const [loaded, setLoaded] = useState({})

    useEffect(() => {
        if (!imageList || imageList.length === 0) return

        getRandomImages(imageList).then((imgs) => {
            // preload images
            imgs.forEach((url) => {
                const fullUrl = `https://beans-1.imglab-cdn.net/${url}`
                const img = new Image()
                img.src = fullUrl
                img.onload = () =>
                    setLoaded((prev) => ({ ...prev, [url]: true }))
                img.onerror = () =>
                    setLoaded((prev) => ({ ...prev, [url]: true }))
            })
            setImages(imgs)
        })
    }, [imageList])

    return (
        <section id="photos">
            <div className="columns-2 gap-4 sm:columns-3">
                {images.map((imageUrl, idx) => {
                    const fullUrl = `https://beans-1.imglab-cdn.net/${imageUrl}`
                    const isLoaded = loaded[imageUrl]

                    return (
                        <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
                            <div className="relative mb-4 w-full overflow-hidden rounded-lg bg-gray-200">
                                {!isLoaded && (
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                )}

                                <img
                                    src={fullUrl}
                                    alt={`Random image ${idx + 1}`}
                                    className={`size-full object-cover transition duration-700 ease-in-out ${
                                        isLoaded
                                            ? "blur-0 opacity-100"
                                            : "blur-lg opacity-70"
                                    }`}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://jiale.imglab-cdn.net/favicon.png?format=avif"
                                    }}
                                />
                            </div>
                        </BlurFade>
                    )
                })}
            </div>
        </section>
    )
}
