import Layout from "@/layouts/globals";
import {Card, CardContent, CardFooter, CardTitle, CardHeader, CardDescription} from "@/components/ui/card";
import Image from "next/image";
import {PhotoProvider, PhotoView} from "react-photo-view";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {MagicCard} from "@/components/magicui/magic-card";
import 'react-photo-view/dist/react-photo-view.css';
import prisma from "@/lib/prisma";
import {Badge} from "@/components/ui/badge";
import {ArrowRight, ImageIcon, MapPinned} from "lucide-react";

export async function getStaticProps() {

    const posts = await prisma.posts.findMany();

    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        },
        revalidate: 10,
    };
}

const Gallery = ({posts}) => {
    return (
        <>
            <Layout>
                <div
                    className={`max-w-screen-md flex flex-col mx-auto p-4 pt-8 items-center space-y-4`}
                >
                    {posts.map((i, id) => (
                        <Card className="p-0 w-full max-w-lg shadow-none" key={id}>
                            <MagicCard
                                gradientFrom={"#96BC3C"}
                                gradientTo={'#CDDE6E'}
                                gradientColor={"#D9D9D955"}
                                className="p-0"
                            >
                                <CardContent>
                                    <Carousel className="w-full">
                                        <CarouselContent>
                                            <PhotoProvider>
                                                {Array.isArray(i.image) && i.image.map((img, id) => (
                                                    <CarouselItem key={id}>
                                                        <PhotoView
                                                            src={`${process.env.NEXT_PUBLIC_SOURCES_URL}/o/${img.sources}/${img.item}`}
                                                        >
                                                            <div>
                                                                <Image
                                                                    quality={100}
                                                                    src={`${process.env.NEXT_PUBLIC_SOURCES_URL}/o/${img.sources}/${img.item}`}
                                                                    alt={`Image ${id + 1}`}
                                                                    className="aspect-video w-full rounded-tl-xl rounded-tr-xl object-cover"
                                                                    width={250}
                                                                    unoptimized={true}
                                                                    height={200}
                                                                />
                                                            </div>
                                                        </PhotoView>
                                                    </CarouselItem>
                                                ))}
                                            </PhotoProvider>
                                        </CarouselContent>
                                    </Carousel>
                                </CardContent>
                                <CardHeader className={'pl-5 pr-5 pt-2 pb-3'}>
                                    <CardTitle className={'flex gap-2 items-center'}>
                                        <p className={'text-xl'}>{`${new Date(i.date).getFullYear()}-${new Date(i.date).getMonth()}-${new Date(i.date).getDate()}`}</p>
                                        <div>
                                            <Badge
                                                className={`mr-2 bg-lime-200 text-black h-5 font-bold text-[12.5px] inline-flex items-center gap-1`}>
                                                <ImageIcon className={'w-5 h-5'}/>
                                                {i.image.length} image{(i.image.length > 1) && 's'}
                                            </Badge>
                                        </div>
                                    </CardTitle>
                                    <CardDescription className={'flex gap-2 overflow-x-auto justify-between'}>
                                        <div className="">
                                            {i.location && (
                                                <a
                                                    target="_blank"
                                                    href={`https://www.google.com/maps?q=${encodeURIComponent(i.location)}`}
                                                    rel="noopener noreferrer"
                                                >
                                                    <Badge
                                                        className={`bg-lime-200 text-black font-bold text-[12.5px] inline-flex items-center gap-1`}>
                                                        <MapPinned className={'w-5 h-5'}/>
                                                        {i.location}
                                                    </Badge>
                                                </a>
                                            )}
                                        </div>
                                        <div onClick={() => {
                                            //router.push(`/${i.id}`)
                                        }}>
                                            <ArrowRight className={'w-5 h-5 cursor-pointer'}/>
                                        </div>
                                    </CardDescription>
                                </CardHeader>


                            </MagicCard>
                        </Card>
                    ))}
                </div>
            </Layout>
        </>
    )
}

export default Gallery