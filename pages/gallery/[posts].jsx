import Layout from "@/layouts/globals";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, MapPinned, Send } from "lucide-react";
import { useRouter } from "next/router";
import React from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import FormattedDate from "@/components/app/FormattedDate";
import { Spinner } from "@/components/ui/spinner"
import { Item, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item"

export async function getStaticPaths() {

    const slugs = await fetch(`${process.env.GALLERY_SERVER}/api/public/gallery`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "jiale-gallery-hearts-key": process.env.GALLERY_SERVER_KEY
        }
    }).then(res => res.json());

    //console.log(slugs);

    return {
        paths: slugs.slugsList.map(post => ({
            params: {
                posts: post
            }
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    try {

        const posts = await fetch(`${process.env.GALLERY_SERVER}/api/public/gallery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "jiale-gallery-hearts-key": process.env.GALLERY_SERVER_KEY
            }
        }).then(res => res.json());

        const post = posts.galleryList.filter(i => i.slugs === params.posts)

        if (post[0]) {
            return {
                props: {
                    post: post[0]
                },
                revalidate: 60,
            };
        } else {
            return {
                notFound: true,
                revalidate: 60
            };
        }


    } catch (e) {
        console.error(e);
        return {
            notFound: true,
        };
    }
}

const Posts = ({ post }) => {
    const router = useRouter();

    if (!post) return (
        <Layout
        navTitle="Loading"
        typeOfPage="gallery"
        path={router.asPath}
        title="Loading ⋅ Jia Le's Gallery"
        description="A collection of images captured through Jia Le's eyes. - Jia Le's Gallery">
            <div className="flex h-screen flex-col items-center  text-center p-3 pt-10 space-y-3">
                <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
                    <Item variant="muted" className={'bg-amber-200 dark:bg-muted'}>
                        <ItemMedia>
                            <Spinner />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="line-clamp-1">Loading...</ItemTitle>
                        </ItemContent>
                    </Item>
                </div>
            </div>
        </Layout>
    );

    return (
        <Layout
            navTitle="Gallery"
            typeOfPage="gallery"
            path={router.asPath}
            title={`${post.title} ⋅ Jia Le's Gallery`}
            description={`Image at ${post.location} on ${new Date(post.date).getFullYear()}-${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(post.date).getDate()).padStart(2, '0')}.`}
        >
            <div className="max-w-screen-md flex flex-col mx-auto p-3 items-center space-y-4">
                <div className="w-full max-w-2xl">
                    <br />
                    <div className="flex justify-between items-center mb-1 mt-2">
                        <h1 className="text-t-green font-bold text-2xl flex items-center">
                            {/*<Image*/}
                            {/*    alt="Icon"*/}
                            {/*    src="https://jiale.imglab-cdn.net/Teddy_Bear.png?format=png"*/}
                            {/*    className="mr-2 w-8 h-8"*/}
                            {/*    width={100}*/}
                            {/*    height={100}*/}
                            {/*    unoptimized*/}
                            {/*/>*/}
                            <FormattedDate date={post.date}/>
                            {/*{new Date(post.date).getFullYear()} -
                                {String(new Date(post.date).getMonth() + 1).padStart(2, '0')}-
                            {String(new Date(post.date).getDate()).padStart(2, '0')}*/}
                        </h1>
                        <div className="flex gap-3 items-center">
                            <Send
                                onClick={() => {
                                    const shareData = {
                                        title: "Jia Le's Gallery 🐻💖",
                                        text: `Image at ${post.location},\n on ${new Date(post.date).getFullYear()}-${String(new Date(post.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(post.date).getDate()).padStart(2, '0')}\n`,
                                        url: window.location.href,
                                    };
                                    navigator.share(shareData);
                                }}
                                className="text-cyan-400 w-5 h-5 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Location and image count */}
                    <div className="flex gap-1 mt-1 mb-5 justify-between">
                        <div>
                            {post.location && (
                                <a
                                    target="_blank"
                                    href={`https://www.google.com/maps?q=${encodeURIComponent(post.location)}`}
                                    rel="noopener noreferrer"
                                >
                                    <Badge className="bg-lime-200 text-black h-6 font-bold text-[12.5px] inline-flex items-center gap-1">
                                        <MapPinned />
                                        {post.location}
                                    </Badge>
                                </a>
                            )}
                        </div>
                        <div>
              <span className="dark:text-[#FCF5EA] h-7 font-bold text-[14px] inline-flex items-center gap-1">
                <ImageIcon className="h-6 w-4" />
                  {post.imagesList.length} image
                  {post.imagesList.length > 1 && 's'}
              </span>
                        </div>
                    </div>

                    {/* Gallery */}
                    <PhotoProvider>
                        {post.imagesList.map((img, idx) => (
                            <div key={idx}>
                                <PhotoView
                                    style={{ zIndex: 9999 }}
                                    src={`${process.env.NEXT_PUBLIC_GALLERY_CDN_LINK}/${post.slugs}/${img}?quality=90&format=avif`}
                                >
                                    <div className="p-[1.60px] rounded-2xl ">
                                        <Image
                                            quality={100}
                                            src={`${process.env.NEXT_PUBLIC_GALLERY_CDN_LINK}/${post.slugs}/${img}?quality=90&format=avif&width=1200&height=800`}
                                            alt={`Image ${idx + 1}`}
                                            className="aspect-video w-full rounded-xl object-cover"
                                            width={250}
                                            height={200}
                                            unoptimized
                                        />
                                    </div>
                                </PhotoView>
                                <br />
                            </div>
                        ))}
                    </PhotoProvider>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default Posts;
