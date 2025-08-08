import Docks from "@/components/magicui/docks";
import Head from "next/head";
import { FloatButton } from "antd";
import localFont from "next/font/local";

const torus = localFont({
    src: "../fonts/torus.otf",
});

export default function Layout({ children, title, og, description, path }) {
    return (
        <>
            <Head>
                <meta property="description" content={description || ""} />
                <meta property="og:image" content={og || "/og.jpg"}/>
                <meta property="og:title" content={title || "Jia Le's Wonderland"}/>
                <meta property="og:site_name" content="Jia Le's Wonderland"/>
                <meta property="og:description" content={description || ""}/>
                <meta property="og:url" content={`https://jiale.in${path || ""}`}/>
                <title>{title || "Jia Le's Wonderland"}</title>
            </Head>
            <div
                className="fixed inset-0 -z-10 bg-[#FCF5EB] dark:bg-[#2F3133] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full  bg-lime-200 opacity-50 blur-[80px]" />
            </div>
            <div className="min-h-screen flex flex-col">
                <main className={`flex-grow ${torus.className}`}>
                    {children}
                </main>
            </div>

            <footer className={`sticky bottom-6 ${torus.className}`}>
                <Docks />
            </footer>

            <FloatButton.BackTop />
        </>
    );
}
