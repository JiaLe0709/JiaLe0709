import Image from "next/image";
import Layout from "@/layouts/globals";

export default function Home() {
    return (
        <Layout
            navTitle={'Home'}
            path={'/'}
            description={"Hi, I'm Jia Le — welcome to my wonderland."}
            typeOfPage={'home'}
        >
            <div
                className={` items-center justify-items-center p-8 `}
            >
                <Image src={'/favicon.png'} alt={'Logo'} width={210} height={210} quality={100}/>
                <h1>Hi, I am Jia Le</h1>
            </div>
        </Layout>
    );
}
