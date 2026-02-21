import Layout from "@/layouts/globals";
import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {ShimmerButton} from "@/components/magicui/shimmer-button";

export async function getStaticProps() {
    return {
        props: {
            //posts: await getAllPosts({ onlyProject: true }),
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
                    Temporaily Unavailable
                </div>
            </div>
        </Layout>
    );
}
