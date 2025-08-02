import Image from "next/image";
import Layout from "@/layouts/globals";

export default function Home() {
    return (
        <Layout>
            <div
                className={` items-center justify-items-center p-8 `}
            >
                <Image src={'/favicon.png'} alt={'Logo'} width={210} height={210} quality={100}/>
                <h1>Hi, I am Jia Le</h1>
            </div>
        </Layout>
    );
}
