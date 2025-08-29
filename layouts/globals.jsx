import Docks from "@/components/magicui/docks";
import Head from "next/head";
import { FloatButton } from "antd";
import localFont from "next/font/local";
import Navbar from "@/components/app/navbar";

const torus = localFont({
    src: "../fonts/torus.otf",
});

export default function Layout({ children, title, og, description, path, typeOfPage, navTitle }) {
    return (
        <>
            <Head>
                {/* Standard SEO */}
                <meta name="description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."} />
                <meta property="description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."}/>
                <meta name="keywords" content={`${title}, Jia Le, Jiale`} />

                {/* Open Graph */}
                <meta property="og:title" content={title || "Jia Le's Wonderland"} />
                <meta property="og:description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."} />
                <meta property="og:image" content={og || "https://jiale.in/og.jpg"} />
                <meta property="og:url" content={`https://jiale.in${path || ""}`} />
                <meta property="og:site_name" content="Jia Le's Wonderland" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || "Jia Le's Wonderland"} />
                <meta name="twitter:description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."} />
                <meta name="twitter:image" content={og || "https://jiale.in/og.jpg"} />
                <link rel="manifest" href="/manifest.json" />
                <title>{title || "Jia Le's Wonderland"}</title>
            </Head>
            <div
                className="fixed inset-0 -z-10 bg-[#FCF5EB] dark:bg-[#2F3133] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full  bg-lime-200 opacity-50 blur-[80px]" />
            </div>
            <div className={`min-h-screen flex flex-col ${torus.className}`}>
                <Navbar navTitle={navTitle || title} typeogpage={typeOfPage} />
                <main className={` ${torus.className}`}>
                    <br/>
                    <br/>
                    {children}
                </main>
            </div>
            <FloatButton.BackTop />
        </>
    );
}
