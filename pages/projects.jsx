import Layout from "@/layouts/globals";
import { getAllPosts } from "@/lib/notion/getAllPosts";
import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ShimmerButton} from "@/components/magicui/shimmer-button";

export async function getStaticProps() {
    return {
        props: {
            posts: await getAllPosts({ onlyProject: true }),
        },
        revalidate: 10,
    };
}

export default function Projects({ posts }) {

    return (
        <Layout
            title="Projects"
            navTitle="Projects"
            path="/projects"
            typeOfPage="projects"
            description="A collection of projects I have worked on. No matter if it's useful or not"
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-center mb-12 hidden tracking-tight">
                    Projects
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                        >
                            <div className="relative w-full h-56">
                                <Image
                                    src={p.page_cover}
                                    alt="Page Cover"
                                    fill
                                    className="rounded-t-2xl object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold mb-2 flex items-center">
                                    {p.icon} {p.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 flex-grow text-balance">
                                    {p.summary}
                                </p>

                                <div className="flex gap-4 mt-4 ">
                                    {
                                        p.project_url && (
                                            <Button
                                                className="flex-1 h-9 rounded-2xl font-bold"
                                                onClick={() => window.open(p.project_url, "_blank")}
                                            >
                                                Code
                                            </Button>
                                        )
                                    }
                                    {
                                        p.live_demo && (
                                            <Button
                                                className="flex-1 h-9 font-bold rounded-2xl"
                                                onClick={() => window.open(p.live_demo, "_blank")}
                                            >
                                                Demo
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
