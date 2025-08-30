import Layout from "@/layouts/globals";
import {getAllPosts} from "@/lib/notion";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/router";
import FormattedDate from "@/components/app/FormattedDate";
import * as motion from "motion/react-client"
import {Pencil, Calendar, Clock} from "lucide-react";
import React from "react";

export async function getStaticProps() {
    const posts = await getAllPosts({onlyPost: true})

    const sanitizedPosts = posts.map((p) => ({
        ...p,
        //page_cover: p.page_cover ?? null
    }))

    return {
        props: {
            posts: sanitizedPosts,
        },
        revalidate: 1,
    }
}

function TruncatedText({ text, limit = 10 }) {
    if (!text) return null;
    const words = text.split(" ");
    const isLong = words.length > limit;
    const displayed = isLong ? words.slice(0, limit).join(" ") + "..." : text;
    return <p className={'text-[15px]'}>{displayed}</p>;
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
                    {posts.map((post, index) => (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                zIndex: 1
                            }}
                            onClick={() => router.push(`/blog/${post.slug}`)}
                            key={index}
                            className="relative w-full max-w-2xl bg-white rounded-2xl border-black border-2 border-b-7 border-r-7 dark:bg-[#191919] border-t-3 border-l-3 p-4 flex flex-col md:flex-row cursor-pointer overflow-hidden group glow-hover"
                        >
                            <div className="relative z-10 inline-block space-y-2">
                                <h1 className="text-2xl font-bold">
                                    {post.icon} {post.title}
                                </h1>
                                <div className="flex gap-2">
                                    <Badge className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                        <Calendar/>
                                        <FormattedDate date={post.date} />
                                    </Badge>
                                    <Badge className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                        <Pencil/> {post.count} Words
                                    </Badge>
                                    <Badge className="bg-lime-200 text-black h-6 font-bold text-[12px] inline-flex items-center gap-1">
                                        <Clock/> {(post.count / 200) < 1 ? '1' : (post.count / 200).toFixed(2)} min
                                    </Badge>
                                </div>
                                <TruncatedText text={post.summary} limit={10} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
