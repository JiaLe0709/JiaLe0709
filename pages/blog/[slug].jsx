import Layout from "@/layouts/globals";
import { Spinner } from "@/components/ui/spinner"
import { Item, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item"
import React from "react";
import Image from "next/image";
// Markdown Render Componenets
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export async function getStaticPaths() {

    const posts = await fetch(`${process.env.BLOG_SERVER}/api/public/slugs`
        , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "jiale-blog-hearts-key": process.env.BLOG_SERVER_KEY
        }
    }).then(res => res.json());

    return {
        paths: posts.map((row) => `/blog/${row.slugs}`),
        fallback: true
    }
}

export async function getStaticProps({ params: { slug } }) {
    const posts = await fetch(`${process.env.BLOG_SERVER}/api/public/posts`
        , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "jiale-blog-hearts-key": process.env.BLOG_SERVER_KEY
            }
        }).then(res => res.json());
    const post = posts.filter(i => i.slugs === slug)

    if (post.length === 0) {
        return {
            notFound: true,
            revalidate: 60
        }
    }

    return {
        props: {
            post: post[0]
        },
        revalidate: 60 * 60 * 24,
    }

}

export const customSanitizeSchema = {
    ...defaultSchema,
    attributes: {
        ...defaultSchema.attributes,

        "*": [
            ...(defaultSchema.attributes["*"] || []),
            "className",
            "id"
        ],

        img: [
            ...(defaultSchema.attributes.img || []),
            "src",
            "alt",
            "width",
            "height",
        ],

    },

    tagNames: [
        ...defaultSchema.tagNames.filter(
            (tag) => tag !== "script" && tag !== "iframe" && tag !== "object"
        )
    ],

    protocols: {
        ...defaultSchema.protocols,
        href: [...(defaultSchema.protocols?.href || []), "mailto", "tel"],
        src: ["http", "https", "data"],
    },
};

export default function BlogPost({post}) {

    if (!post) {
        return (
            <Layout
                navTitle="Loading"
                typeOfPage="blog"
                path={'blog'}
                title="Loading ⋅ Jia Le's Blog"
                description="A wonderful things in the world. - Jia Le's Blog">
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
                    <Image src={'https://cdn.jsdelivr.net/gh/Jiale0709/jsdeliver@latest/jiale-wonderland-asset/sleep.png'} alt={'404'} width={270} unoptimized={true} height={250} className={'rounded-md mt-2'}/>
                </div>
            </Layout>
        )
    }

    return (
        <>
            <Layout
                navTitle={'Blog'}
                path={'/blog'}
                typeOfPage={'blog'}
                title={`${post?.title} ⋅ Jia Le's Blog`}
                description={post?.description}>
                <div className="flex flex-col md:flex-row md:px-8 px-6 mt-10">
                    <aside className={"min-h-screen md:order-1 order-3  hidden md:block w-full flex-3"}>
                    </aside>
                    <div className={"min-h-screen md:order-2  w-full flex-6"}>
                        <main className={"wrap-break-word min-w-full prose dark:prose-invert [&_h1]:scroll-mt-20 [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_h4]:scroll-mt-20 [&_h5]:scroll-mt-20 [&_h6]:scroll-mt-20 [&_img]:block [&_img]:mx-auto mb-16 "}>
                            <Markdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[
                                    rehypeRaw,
                                    rehypeKatex,
                                    [rehypeSanitize, customSanitizeSchema]
                                ]}
                            >
                                {post.content}
                            </Markdown>
                        </main>
                    </div>
                    <div className={"md:min-h-screen md:block hidden md:mb-0 mb-6 md:order-3 w-full flex-3 "}>
                        <div className={"md:pt-16 md:pl-8"}>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}