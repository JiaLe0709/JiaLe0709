import Layout from "@/layouts/globals";
import prisma from '@/lib/prisma'
import {PhotoProvider, PhotoView} from "react-photo-view";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {ImageIcon, MapPinned, X, Send} from "lucide-react";
import {useRouter} from "next/router";
import React from 'react';
import 'react-photo-view/dist/react-photo-view.css';

export async function getStaticPaths() {

    async function getPostsSlug() {
        return prisma.posts.findMany();
    }

    const slugs = await getPostsSlug();

    return {
        paths: slugs.map(post => ({
            params: {posts: post.id.toString()}
        })),
        fallback: true
    };
}

export async function getStaticProps({params}) {

    async function getPostsData(params) {
        return prisma.posts.findUnique({
            where: {
                id: parseInt(params)
            }
        });
    }

    try {
        const post = await getPostsData(params.posts);

        if (!post) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                post: JSON.parse(JSON.stringify([post]))
            },
            revalidate: 60,
        };

    } catch (e) {
        return {
            notFound: true
        }
    }
}

const Posts = ({post}) => {

    const router = useRouter();

    return (
        <>
            {post &&
                post.map((i, id) => (
                    <div key={id}>
                        <Layout title={`Image at ${i.location} || Jia Le's Gallery`}>
                            <div className="flex justify-center min-h-screen p-4">
                                <div className="w-full max-w-md">
                                    <div key={id}>
                                        <div className="flex justify-between items-center mb-1 mt-2">
                                            <h1 className="text-t-green font-bold text-2xl flex items-center">
                                                <Image
                                                    alt="Icon"
                                                    src="/Teddy_Bear.png"
                                                    className="mr-2 w-8 h-8"
                                                    width={100}
                                                    height={100}
                                                    unoptimized={true}
                                                />
                                                {`${new Date(i.date).getFullYear()}-${new Date(i.date).getMonth()}-${new Date(i.date).getDate()}`}
                                            </h1>
                                            <div className={'flex gap-3 items-center'}>
                                                <Send
                                                    onClick={() => {
                                                        const shareData = {
                                                            title: 'Images 🐻💖',
                                                            text: `Image at ${i.location},\n on ${new Date(i.date).getFullYear()}-${String(new Date(i.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(i.date).getDate()).padStart(2, '0')}\n`,
                                                            url: window.location.href,
                                                        };
                                                        navigator.share(shareData);
                                                    }}
                                                    className={'text-cyan-400 w-5 h-5 cursor-pointer '}
                                                />
                                                <p onClick={() => {
                                                    router.push('/gallery')
                                                }} className={'flex'}>
                                                    <X className={'text-red-400 w-7 h-7 cursor-pointer font-bold ml-1'}/>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={'flex gap-1 mt-1 mb-5 justify-between'}>
                                            <div>
                                                {i.location && (
                                                    <a
                                                        target="_blank"
                                                        href={`https://www.google.com/maps?q=${encodeURIComponent(i.location)}`}
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Badge
                                                            className={`bg-lime-200 text-black h-6 font-bold text-[12.5px] inline-flex items-center gap-1`}>
                                                            <MapPinned/>
                                                            {i.location}
                                                        </Badge>
                                                    </a>
                                                )}
                                            </div>
                                            <div>
                                            <span
                                                className={` dark:text-[#FCF5EA] h-7 font-bold text-[14px] inline-flex items-center gap-1`}>
                                                <ImageIcon className={'h-6 w-4 '}/>
                                                {i.image.length} image{(i.image.length > 1) && 's'}
                                            </span>
                                            </div>

                                        </div>
                                        {/*<hr className="h-2/3 rounded-sm my-4 bg-lime-300"/>*/}
                                        <PhotoProvider>
                                            {i.image.map((img, id) => (
                                                <div key={id}>
                                                    <PhotoView
                                                        src={`${process.env.NEXT_PUBLIC_SOURCES_URL}/o/${img.sources}/${img.item}`}
                                                    >
                                                        <div>
                                                            <Image
                                                                quality={100}
                                                                src={`${process.env.NEXT_PUBLIC_SOURCES_URL}/o/${img.sources}/${img.item}`}
                                                                alt={`Image ${id + 1}`}
                                                                className="aspect-video w-full rounded-xl object-cover"
                                                                width={250}
                                                                height={200}
                                                                unoptimized={true}
                                                            />
                                                        </div>
                                                    </PhotoView>
                                                    <br/>
                                                </div>
                                            ))}
                                        </PhotoProvider>
                                    </div>

                                </div>
                            </div>
                        </Layout>
                    </div>
                ))}
        </>
    );
};

export default Posts;