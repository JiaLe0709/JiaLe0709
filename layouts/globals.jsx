import Head from "next/head";
import {FloatButton} from "antd";
import localFont from "next/font/local";
import Navbar from "@/components/app/navbar";
import Link from "next/link";
import VisitCounter from "@/components/app/visitCounter";

const torus = localFont({
    src: "../fonts/torus.otf",
});

export default function Layout({children, title, og, description, path, typeOfPage, navTitle}) {

    const { counter } = VisitCounter();

    return (
        <>
            <Head>
                {/* Standard SEO */}
                <meta name="description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."}/>
                <meta property="description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."}/>
                <meta name="keywords" content={`${title}, Jia Le, Jiale`}/>

                {/* Open Graph */}
                <meta property="og:title" content={title || "Jia Le's Wonderland"}/>
                <meta property="og:description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."}/>
                <meta property="og:image" content={og || "https://jiale.in/og.jpg"}/>
                <meta property="og:url" content={`https://jiale.in${path || ""}`}/>
                <meta property="og:site_name" content="Jia Le's Wonderland"/>

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:title" content={title || "Jia Le's Wonderland"}/>
                <meta name="twitter:description" content={description || "Hi, I'm Jia Le — welcome to my wonderland."}/>
                <meta name="twitter:image" content={og || "https://jiale.in/og.jpg"}/>
                <link rel="manifest" href="/manifest.json"/>
                <title>{title || "Jia Le's Wonderland"}</title>
            </Head>
            <div
                className="fixed inset-0 -z-10 bg-[#FCF5EB] dark:bg-[#2c2c2c] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div
                    className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full  bg-lime-200 opacity-50 blur-[80px]"/>
            </div>
            <div className={`min-h-screen flex flex-col ${torus.className}`}>
                <Navbar navTitle={navTitle || title} typeogpage={typeOfPage}/>
                <main className={`flex-grow ${torus.className}`}>
                    <br/>
                    <br/>
                    {children}
                </main>
                <br/>
                <footer className="rounded-lgm-4 ">
                    <div className="max-w-5xl mx-auto items-center text-center p-4 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-[#E0E0E0]">
                            © {new Date().getFullYear()}
                            <a href="https://jiale.in/">
                            {` Jia Le's Wonderland | 😎 ${counter || 0}`}
                            </a>
                        </span>
                        {/*<ul
                            className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="https://status.jiale.in" target={"_blank"} className=" me-4 md:me-6">Status</a>
                            </li>
                            <li>
                                <Link href="/contact">Contact</Link>
                            </li>
                        </ul>*/}
                    </div>
                </footer>
                <br/>
            </div>
            <FloatButton.BackTop/>
        </>
    );
}
