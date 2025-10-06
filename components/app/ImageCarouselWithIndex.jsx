import React, { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";

export default function CarouselWithIndex({ i }) {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    let images = [];
    try {
        const parsed = Array.isArray(i.image) ? i.image : JSON.parse(i.image ?? "[]");

        images = parsed.map((img) =>
            typeof img === "string"
                ? { item: img }
                : { item: img.item ?? img.url ?? "", sources: img.sources ?? "" }
        );
    } catch {
        images = [];
    }

    return (
        <>
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    <PhotoProvider>
                        {images.map((img, id) => {

                            return (
                                <CarouselItem key={id}>
                                    <PhotoView src={`https://wallsbyjiale.imglab-cdn.net/${img.item}`}>
                                        <Image
                                            loading="lazy"
                                            quality={100}
                                            src={`https://wallsbyjiale.imglab-cdn.net/${img.item}?round-radius=12`}
                                            alt={`Image ${id + 1}`}
                                            className="aspect-video w-full rounded-xl object-cover"
                                            width={250}
                                            height={200}
                                            unoptimized
                                        />
                                    </PhotoView>
                                </CarouselItem>
                            );
                        })}
                    </PhotoProvider>
                </CarouselContent>
            </Carousel>

            {images.length > 0 && (
                <div className="text-muted-foreground py-2 text-sm">
                    Image {current} of {count}
                </div>
            )}
        </>
    );
}
