import "@/styles/globals.css";
import ThemeProvider from "@/components/themeprovider";

export default function App({Component, pageProps}) {
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
