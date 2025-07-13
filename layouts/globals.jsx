import Docks from "@/components/magicui/docks";
import Head from "next/head";
import {FloatButton} from 'antd';

export default function Layout({children, title}) {
    return (
        <>
            <Head>
                <title>{title || "Jia Le"}</title>
            </Head>
            <div className="fixed inset-0 -z-10 bg-[#FCF5EB] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px), linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-lime-200 opacity-50 blur-[80px]"></div>
            </div>
            <div className="min-h-screen flex flex-col">
                <main className={'flex-grow'}>
                    {children}
                </main>
                <footer className="sticky bottom-6">
                    <Docks/>
                </footer>
            </div>
            <FloatButton.BackTop/>
        </>
    );
}

                           
                           