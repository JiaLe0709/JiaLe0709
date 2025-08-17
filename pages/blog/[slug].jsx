import Layout from "@/layouts/globals";
import {getAllPosts} from "@/lib/notion/getAllPosts";
import {getPostBlocks} from "@/lib/notion/getPostBlocks";
import {NotionRenderer} from "react-notion-x";
import dynamic from "next/dynamic";
import 'react-notion-x/src/styles.css'
import 'katex/dist/katex.min.css'

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

export default function BlogPost({post, blockMap}) {
    return (
        <>
            <Layout
                navTitle={'Blog'}
                path={'/blog'}
                typeOfPage={'blog'}
                title={`${post?.title} ⋅ Jia Le's Blog`}
                description={post?.summary}>
                <div
                    className={`max-w-screen-md flex flex-col mx-auto pr-4 pl-4 items-center `}
                >
                    <div className="w-full max-w-2xl">
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