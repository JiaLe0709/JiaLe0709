import "@/styles/globals.css";
import "@/styles/nprogress.css";
import '@/styles/notionOverride.css'
import '@/styles/prism.css'
import NProgress from 'nprogress'
import {useRouter} from "next/router";
import {useEffect} from "react";
import ThemeProvider from "@/components/themeprovider";

export default function App({Component, pageProps}) {

    const router = useRouter()

    useEffect(() => {
        const handleStart = (url) => {
            NProgress.start()
        }
        const handleStop = () => {
            NProgress.done()
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    /*
    Router.events.on('routeChangeStart', () => NProgress.start());
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
    */

    NProgress.configure({showSpinner: true})

    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                disableTransitionOnChange
            >
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
