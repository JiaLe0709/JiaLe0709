import Image from "next/image";
import Layout from "@/layouts/globals";

export default function Home() {
    return (
        <Layout>
            <div
                className={` items-center justify-items-center p-8 `}
            >
                <Image src={'/favicon.ico'} alt={'Jia Le @ Cat'} width={210} height={210}/>
                <h1>Hi, I am Jia Le</h1>
            </div>
        </Layout>
    );
}
