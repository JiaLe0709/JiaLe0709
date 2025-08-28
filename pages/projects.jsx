import Layout from "@/layouts/globals";
import {getAllPosts} from "@/lib/notion/getAllPosts";
import React from "react";
import Image from "next/image";
import {InteractiveHoverButton} from "@/components/magicui/interactive-hover-button";
import {useRouter} from "next/router";

export async function getStaticProps() {
    return {
        props: {
            posts: await getAllPosts({onlyProject: true})
        },
        revalidate: 10,
    };
}

export default function Projects({posts}) {

    const router = useRouter()

    return (
        <>
            <Layout
                title={'Projects'}
                navTitle={'Projects'}
                path={'/projects'}
                typeOfPage={'projects'}
                description={'A collection of projects I have worked on. No matter its useful or not'}
            >
                <br/>
                <div className="max-w-screen-md flex flex-col mx-auto pr-4 pl-4 items-center">
                    <div className="w-full max-w-2xl space-y-4">
                        <br/>
                        {posts.map((p) => (
                            <div
                                className="w-full max-w-sm md:max-w-2xl bg-white rounded-2xl border-black border-2 border-b-6 border-r-6 dark:bg-[#191919] border-t-3 border-l-3 p-6 flex flex-col md:flex-row overflow-hidden glow-hover mx-auto"
                                key={p.id}
                            >
                                <Image
                                    src={p.page_cover}
                                    alt={'Page Cover'}
                                    width={150}
                                    height={150}
                                    className={'rounded-xl aspect-video object-cover mb-4 md:mb-0 md:mr-4 w-full md:w-65 max-w-sm md:max-w-none'}
                                />
                                <div className="flex-1">
                                    <h2 className={'text-2xl font-bold'}>{p.title}</h2>
                                    <p className={'text-gray-600 dark:text-gray-200'}>{p.summary}</p>
                                    <div className="pt-4">
                                        <InteractiveHoverButton
                                            className={'cursor-pointer'}
                                            onClick={() =>window.open(p.project_url, '_blank')}
                                        >
                                            Code
                                        </InteractiveHoverButton>
                                        <InteractiveHoverButton
                                            onClick={() => window.open(p.live_demo, '_blank')}
                                            className={'ml-4 cursor-pointer'}
                                        >
                                            Demo
                                        </InteractiveHoverButton>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}