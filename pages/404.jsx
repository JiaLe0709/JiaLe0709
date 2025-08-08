import Layout from "@/layouts/globals";
import Image from "next/image";
import {useRouter} from "next/router";

const NotFound = () => {

    const router = useRouter();

    return (
        <>
        <Layout title={'Page Not Found !'}>
            <div className="flex h-screen flex-col items-center  text-center p-3 space-y-3">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">404</h1>
                <Image src={'/sad.png'} alt={'404'} width={400} height={200} className={'rounded-md mt-2'}/>
                <p className="mt-4 text-2xl text-gray-600 dark:text-gray-200">Page Not Found</p>
                <p className="mt-2 text-gray-500 dark:text-gray-100">The page you’re looking for doesn’t exist or has
                    been moved.</p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 inline-block rounded-xl bg-black px-6 py-2 text-white hover:bg-gray-800 transition"
                >
                    Go Home
                </button>
            </div>
        </Layout>
    </>
    )
}

export default NotFound