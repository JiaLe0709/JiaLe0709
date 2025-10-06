import Layout from "@/layouts/globals";
import {getAllPosts} from "@/lib/notion/getAllPosts";
import {getPostBlocks} from "@/lib/notion/getPostBlocks";
import {NotionRenderer} from "react-notion-x";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Spinner } from "@/components/ui/spinner"
import { Item, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item"
import React from "react";
import Image from "next/image";

const Code = dynamic(() =>
    import("react-notion-x/build/third-party/code").then(m => m.Code)
    , { ssr: false }
)
const Collection = dynamic(() =>
    import("react-notion-x/build/third-party/collection").then(m => m.Collection)
    , { ssr: false }
)
const Equation = dynamic(() =>
    import("react-notion-x/build/third-party/equation").then(m => m.Equation),
    { ssr: false }
)
const Pdf = dynamic(
    () => import("react-notion-x/build/third-party/pdf").then(m => m.Pdf),
    { ssr: false }
)
const Modal = dynamic(
    () => import("react-notion-x/build/third-party/modal").then(m => m.Modal),
    { ssr: false }
)

const Comment = dynamic(
    () => {
        return import('@/components/app/comments')
    },
    { ssr: false }
)

export async function getStaticPaths() {
    const posts = await getAllPosts({onlyPost: true})
    //console.log(posts)
    return {
        paths: posts.map((row) => `/blog/${row.slug}`),
        fallback: true
    }
}

export async function getStaticProps({ params: { slug } }) {
    const posts = await getAllPosts({ onlyPost: true });
    const post = posts.find((t) => t.slug === slug);

    //console.log(post)

    if (!post) {
        return {
            notFound: true
        };
    }

    try {
        const blockMap = await getPostBlocks(post.id);

        // sanitize undefined fields
        const safePost = JSON.parse(
            JSON.stringify(post, (key, value) => (value === undefined ? null : value))
        );

        return {
            props: {
                post: safePost,
                blockMap,
            },
            revalidate: 1
        };
    } catch (err) {
        console.error(err);
        return {
            props: {
                post: null,
                blockMap: null,
                notFound: true,
            },
        };
    }
}

const torus = localFont({
    src: "../../fonts/torus.otf",
    variable: "--font-torus"
});

export default function BlogPost({post, blockMap}) {

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
                    <Image src={'https://jiale.imglab-cdn.net/sleep.png?format=avif'} alt={'404'} width={270} unoptimized={true} height={250} className={'rounded-md mt-2'}/>
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
                description={post?.summary}>
                <div
                    className={`max-w-screen-lg flex flex-col mx-auto pr-4 pl-4 items-center `}
                    style={{ "--notion-font": "var(--font-torus)" }}
                >
                    <div className="w-full max-w-3xl">
                        <NotionRenderer
                            pageTitle={post?.title}
                            frontMatter={post}
                            components={{
                                Code,
                                Collection,
                                Equation,
                                Pdf,
                                Modal,
                            }}
                            recordMap={blockMap}
                        />
                        <Comment/>
                        <br/>
                    </div>
                </div>
                <br/>
            </Layout>
        </>
    )
}