import Image from "next/image";
import Layout from "@/layouts/globals"
import Link from "next/link"
import GreetingTitle from "@/components/app/greetingTitle";
import GalleryStack from "@/components/app/GalleryStack";
import Connection from "@/components/app/Connection";
import React from "react";

export async function getStaticProps() {
    let imageData = []

    try {
        const res = await fetch("https://beans-1.jiale.in/list", {
            headers: {
                "User-Agent": "vercel-fetch",
                "Accept": "application/json,text/plain,*/*",
            },
        })

        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
        }

        const text = await res.text()

        imageData = JSON.parse(text)

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
        revalidate: 10,
    }
}

export default function Home({ imageList }) {

    return (
        <Layout
            navTitle="Home"
            path="/"
            description="Hi, I'm Jia Le — welcome to my wonderland."
            typeOfPage="home"
        >
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <Image src="/favicon.png" alt="Logo" width={170} height={170} quality={100}/>
                <h1 className=" text-2xl font-semibold flex"><GreetingTitle/></h1>
            </div>

            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-5 border-b-5 bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">📜 About me</h2>
                    {
                        <Image
                            src="/kitchenBanner.png"
                            alt="Kitchen Banner"
                            width={843}
                            height={180}
                            className="w-full h-[120px] object-cover object-center rounded-xl mb-4"
                        />}
                    <p className="text-[16px] leading-relaxed text-gray-700 dark:text-[#9A9A9A]">
                        I’m a passionate individual who enjoys learning new skills and exploring
                        new interests. I have a strong curiosity about technology and photography,
                        and right now I’m focusing on improving my photography, writing better
                        content, and creating functional tools.
                    </p>
                    <Image
                        src="/jiale.png"
                        alt="sign"
                        height={150}
                        width={150}
                        className="invert dark:invert-0 ml-auto mt-4"
                    />

                </div>
            </section>

            <br/>
            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-5 border-b-5 bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">
                        <Link href={'gallery'} className={'cursor-pointer hover'}>
                            🖼️ Gallery
                        </Link>
                    </h2>
                    <GalleryStack imageList={imageList}/>
                </div>
            </section>

            <br/>
            <section className="mx-auto max-w-5xl px-3">
                <div
                    className="rounded-2xl border border-t-3 border-l-3 border-r-5 border-b-5 bg-[#FFFFFF] dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
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
