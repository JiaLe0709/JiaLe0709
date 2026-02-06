import Image from "next/image";
import Layout from "@/layouts/globals"
import Link from "next/link"
import GreetingTitle from "@/components/app/greetingTitle";
import GalleryStack from "@/components/app/GalleryStack";
import Connection from "@/components/app/Connection";
import {RefreshCcw} from 'lucide-react';
import React from "react";
import {motion} from "framer-motion"
import ImageData from "@/components/app/imageData";

export async function getStaticProps() {
    let imageData = []

    try {
        /*
        const res = await fetch("https://beans-1.jiale.in/list", {
            headers: {
                "User-Agent": "vercel-fetch",
                "Accept": "application/json,text/plain",
            },
        })

        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
        }

        const text = await res.text()
    */
        imageData = ImageData


    } catch (e) {
        console.error("Image list fetch failed:", e)
        imageData = [
            "IMG20250627143008.jpg",
            "IMG_20250627_141142.jpg",
            "IMG20250627135603.jpg",
            "IMG_20240212_111953.jpg",
            "IMG20250627134207.jpg",
            "IMG_20240212_115214.jpg",
        ]
    }

    return {
        props: {
            imageList: imageData,
        },
        //revalidate: 10,
    }
}

export default function Home({imageList}) {

    const [trigger, setTrigger] = React.useState(1)

    return (
        <Layout
            navTitle="Home"
            path="/"
            description="Hi, I'm Jia Le — welcome to my wonderland."
            typeOfPage="home"
        >
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <motion.div
                    whileTap={{ scale: 0.8 }} // minimize on press
                    animate={{ scale: 1 }} // default back to normal
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                    }}
                    className="cursor-pointer select-none"
                >
                    <Image
                        src="/favicon.png"
                        alt="Logo"
                        unoptimized={true}
                        width={170}
                        height={170}
                        quality={100}
                    />
                </motion.div>
                <h1 className=" text-2xl font-semibold flex"><GreetingTitle/></h1>
            </div>

            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-[4.7] border-b-[4.7] bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">📜 About me</h2>
                    {/*
                        <Image
                            unoptimized={true}
                            src="https://jiale.imglab-cdn.net/matchaBanner.png"
                            alt="Kitchen Banner"
                            width={843}
                            height={180}
                            className="w-full h-[120px] object-cover select-none object-center rounded-xl mb-4"
                        />*/}
                    <p className="text-[16px] leading-relaxed text-gray-700 dark:text-[#9A9A9A]">
                        I’m a passionate individual who enjoys learning new skills and exploring
                        new interests. I have a strong curiosity about technology and photography,
                        and right now I’m focusing on improving my photography and creating functional tools.
                    </p>
                    <Image
                        src="/jiale.png"
                        alt="sign"
                        height={150}
                        width={150}
                        className="invert dark:invert-0 ml-auto mt-4 select-none"
                    />

                </div>
            </section>

            <br/>
            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-[4.7] border-b-[4.7] bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white flex">
                        <Link href={'gallery'} className={'cursor-pointer hover'}>
                            🖼️ Gallery
                        </Link>
                        <RefreshCcw onClick={() => {
                            setTrigger((i) => i + 1)
                        }} className={'ml-auto cursor-pointer hover h-5 w-5'}/>
                    </h2>
                    <GalleryStack imageList={imageList} TriggeredToReload={trigger}/>
                </div>
            </section>

            <br/>
            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-[4.7] border-b-[4.7] bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">
                        🌸 Connection
                    </h2>
                    {/*<Image
                        src="/gardenBanner.png"
                        alt="Garder Banner"
                        width={843}
                        height={180}
                        className="w-full h-[120px] object-cover object-center rounded-xl mb-4"
                    />*/}
                    <Connection/>
                </div>
            </section>


        </Layout>
    );
}
