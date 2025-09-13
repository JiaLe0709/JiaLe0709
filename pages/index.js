import Image from "next/image";
import Layout from "@/layouts/globals"
import Link from "next/link"
import GreetingTitle from "@/components/app/greetingTitle";
import GalleryStack from "@/components/app/GalleryStack";
import React from "react";

export default function Home() {

    // Dummy data — replace with your own content
    const posts = [
        { title: "How I built this site", excerpt: "A walkthrough covering the design choices and tools I used." },
        { title: "Learning Tailwind v4 fast", excerpt: "Tips that made styling easier and faster." },
    ];

    const projects = [
        { name: "TinyNotes", desc: "A minimal note app that syncs with localStorage", link: "#" },
        { name: "Counter API", desc: "A microservice in FastAPI for visitor counts", link: "#" },
        { name: "Portfolio", desc: "This website (source)", link: "#" },
    ];

    const gallery = Array.from({ length: 6 }).map((_, i) => ({
        title: `Image ${i + 1}`,
        img: "/favicon.png", // replace with your real images
    }));

    return (
        <Layout
            navTitle="Home"
            path="/"
            description="Hi, I'm Jia Le — welcome to my wonderland."
            typeOfPage="home"
        >
            <div className="flex flex-col items-center justify-center p-4 text-center">
                <Image src="/favicon.png" alt="Logo" width={170} height={170} quality={100} />
                <h1 className=" text-2xl font-semibold flex"><GreetingTitle /></h1>
            </div>

            <section className="mx-auto max-w-5xl px-3">
                <div className="rounded-2xl border border-t-3 border-l-3 border-r-5 border-b-5 bg-white dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">📝 About me</h2>
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
                </div>
            </section>

            <br/>
            <section className="mx-auto max-w-5xl px-3">
                <div className="rounded-2xl border border-t-3 border-l-3 border-r-5 border-b-5 bg-white dark:bg-[#191919] dark:text-slate-50 border-black shadow-md p-4">
                    <h2 className="mb-4 text-xl font-semibold dark:text-white">🖼️ Gallery</h2>
                    <GalleryStack/>
                </div>
            </section>

        </Layout>
    );
}
