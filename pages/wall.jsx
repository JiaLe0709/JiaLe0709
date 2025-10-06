import Layout from "@/layouts/globals";
import React from "react";
import CarouselWithIndex from "@/components/app/ImageCarouselWithIndex";
import { getAllPosts } from "@/lib/notion/getAllPosts";
import 'react-photo-view/dist/react-photo-view.css';
import {AvatarFallback, AvatarImage, Avatar} from "@/components/ui/avatar";
import FormattedDate from "@/components/app/FormattedDate";

export async function getStaticProps() {
    const posts = await getAllPosts({ onlyWall: true });

    const sanitizedPosts = posts.map((p) => ({
        ...p,
        page_cover: p.page_cover ?? null,
        image: p.image ?? "[]", // ensure image is always defined
    }));

    return {
        props: {
            posts: sanitizedPosts,
        },
        revalidate: 1,
    };
}

const Wall = ({ posts }) => {

    //console.log(posts);

    /*
    posts.map((p) =>
        console.log(`${p.date}, ${p.title}, ${p.image}, ${p.contents}, ${p.location}`)
    );
    */

    return (
        <Layout
            navTitle={"Wall"}
            path={"wall"}
            typeOfPage={"wall"}
            title={"Jia Le's Wall"}
            description={"A wall of thoughts..."}
        >
            <br />
            <div
                className={`max-w-screen-md flex flex-col mx-auto p-4 pt-6 items-center space-y-4`}
            >
                {posts.map((i, id) => (
                    <div className={"p-0 w-full max-w-xl shadow-none"} key={id}>
                        <div className="rounded-2xl border border-t-3 border-l-3 border-r-[4.7] border-b-[4.7] bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                            <div className="flex items-start gap-3 flex-1 pb-2">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={"https://jiale.imglab-cdn.net/favicon.png?format=avif"} alt={"Jia Le"} />
                                    <AvatarFallback>Jia Le</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center">
                                        <span className="font-semibold text-sm text-foreground">Jia Le</span>
                                    </div>
                                    <span className="text-[14px] text-muted-foreground"><FormattedDate date={i.date}/></span>
                                </div>
                            </div>
                            <h2 className={'text-xl font-bold'}>{i.title}</h2>
                            <div className="pb-3">
                                <span className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">{i.contents}</span>
                            </div>
                            {i.image && <CarouselWithIndex i={i} />}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Wall;
