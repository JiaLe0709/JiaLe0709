import Layout from "@/layouts/globals";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/router";
import FormattedDate from "@/components/app/FormattedDate";
import * as motion from "motion/react-client"
import {Pencil, Calendar, Clock} from "lucide-react"
import React, {Fragment} from "react";

export async function getStaticProps() {
    const posts = await fetch(`${process.env.BLOG_SERVER}/api/public/posts`
        , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "jiale-blog-hearts-key": process.env.BLOG_SERVER_KEY
        }
    }).then(res => res.json());

    return {
        props: {
            posts: posts ?? null
        },
        revalidate: 60 * 60 * 24,
    }
}

function TruncatedText({text, limit = 10}) {
    if (!text) return null;
    const words = text.split(" ");
    const isLong = words.length > limit;
    const displayed = isLong ? words.slice(0, limit).join(" ") + "..." : text;
    return <p className={'md:text-[16px] text-[14.5px]'}>{displayed}</p>;
}

export default function Blog({posts}) {
    const router = useRouter()
    return (
        <Layout
            navTitle={'Blog'}
            path={'/blog'}
            typeOfPage={'blog'}
            title={'Jia Le\'s Blog'}
            description={"A wonderful things in the world. - Jia Le's Blog"}>
            <br/>
            <div className="max-w-screen-md flex flex-col mx-auto pr-4 pl-4 items-center">
                <div className="w-full max-w-2xl space-y-4">
                    <br/>
                    {posts.length === 0 ? "" : (
                        <Fragment>
                            {posts.map((post) => (
                                <motion.div
                                    whileHover={{scale: 1.1}}
                                    whileTap={{scale: 0.95}}
                                    style={{
                                        zIndex: 1
                                    }}
                                    onClick={() => router.push(`/blog/${post.slugs}`)}
                                    key={post.slugs}
                                    className="relative w-full  bg-white rounded-2xl border-black border-2 border-b-5 border-r-5 dark:bg-[#191919] border-t-3 border-l-3 p-4 flex flex-col md:flex-row cursor-pointer overflow-hidden group glow-hover"
                                >
                                    <div className="relative z-10 inline-block space-y-2">
                                        <h1 className="text-2xl font-bold">
                                            {post.title}
                                        </h1>
                                        <div className="flex gap-2">
                                            <Badge
                                                className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                                <Calendar/>
                                                <FormattedDate date={post.date}/>
                                            </Badge>
                                            <Badge
                                                className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                                <Pencil/> {post.wordcount} Words
                                            </Badge>
                                            <Badge
                                                className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                                <Clock/> {(post.wordcount / 200) < 1 ? '1' : (post.wordcount / 200).toFixed(2)} min
                                            </Badge>
                                        </div>
                                        <TruncatedText text={post.description} limit={50}/>
                                    </div>
                                </motion.div>
                            ))}
                        </Fragment>
                    )}
                </div>
            </div>
        </Layout>
    )
}
