import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import ShinyText from "@/components/reactbits/ShinyText/ShinyText";

export default function Navbar({ typeogpage, navTitle }) {
    const { theme, setTheme } = useTheme()
    const [showNav, setShowNav] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [showMax90, setShowMax90] = useState(false)

    useEffect(() => {
        function handleResize() {
            const mobile = window.innerWidth < 1024
            const show90 = window.innerWidth < 900
            setShowMax90(show90)
            setIsMobile(mobile)
            if (!mobile) {
                setShowNav(false)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest("nav") && isMobile) {
                setShowNav(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [isMobile])

    return (
        <nav
            style={{
                position: "fixed",
                zIndex: 1,
                isolation: "isolate",
            }}
            className={`select-none font-bold fixed top-4 w-[66%] ${showMax90 && 'w-[90%]'} mx-auto left-1/2 -translate-x-1/2
                border-t-2 border-l-2 border-r-5 border-b-5 bg-white border-black text-black
                dark:bg-black dark:text-slate-50 rounded-full font-mono h-14 p-5 overflow-visible max-w-7xl
                flex items-center justify-between gap-4 `}
        >
            <div className="flex items-center gap-2">
                <Image src="/favicon.png" alt="logo" width={44} height={44} />
                <span className="font-bold text-black dark:text-slate-200 whitespace-nowrap">{navTitle}</span>
            </div>

            {!isMobile ? (
                <div className="flex items-center justify-left">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link href="/" className={typeogpage?.toString() === "home" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}>Home</Link>
                        </li>
                        <li>
                            <Link href="/blog" className={typeogpage?.toString() === "blog" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}>Blog</Link>
                        </li>
                        <li>
                            <Link href="/gallery" className={typeogpage?.toString() === "gallery" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}>Gallery</Link>
                        </li>
                        <li>
                            <Link href="/projects" className={typeogpage?.toString() === "projects" ? "dark:text-lime-300  font-bold text-[#59A808]" : ""}>Projects</Link>
                        </li>
                        <li>
                            <Link href="/contact" className={typeogpage?.toString() === "contact" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}>Contact</Link>
                        </li>
                        <li>
                            <span
                                className="cursor-pointer"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <Sun className="size-5 dark:hidden text-amber-500" />
                                <Moon className="size-5 hidden dark:block text-blue-400" />
                            </span>
                        </li>
                    </ul>
                </div>
            ) : (

                <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full min-w-[40px] flex items-center gap-1"
                    onClick={() => setShowNav(prev => !prev)}
                >
                    {showNav ? <ChevronUp /> : <ChevronDown />}
                </Button>
            )}

            {isMobile && showNav && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-black
                border-t-2 border-l-2 border-r-5 border-b-5 border-black rounded-3xl p-4
                max-h-[calc(100vh-6rem)] overflow-y-auto">
                    <ul className="flex flex-col items-center gap-4">
                        <li>
                            <Link
                                href="/"
                                className={typeogpage?.toString() === "home" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}
                                onClick={() => setShowNav(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/blog"
                                className={typeogpage?.toString() === "blog" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}
                                onClick={() => setShowNav(false)}
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/gallery"
                                className={typeogpage?.toString() === "gallery" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}
                                onClick={() => setShowNav(false)}
                            >
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/projects"
                                className={typeogpage?.toString() === "projects" ? "dark:text-lime-300  font-bold text-[#59A808]" : ""}
                                onClick={() => setShowNav(false)}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className={typeogpage?.toString() === "contact" ? "dark:text-lime-300 font-bold text-[#59A808]" : ""}
                                onClick={() => setShowNav(false)}
                            >
                                Contact
                            </Link>
                        </li>
                        <li>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.share({
                                        title: "Jia Le's Wonderland",
                                        text: `This is the start of something good... and it will get better.\n`,
                                        url: window.location.href,
                                    })
                                    setShowNav(false)
                                }}
                            >
                                Share
                            </span>
                        </li>
                        <li>
                            <span
                                className="cursor-pointer"
                                onClick={() => {
                                    setTheme(theme === "dark" ? "light" : "dark")
                                    setShowNav(false)
                                }}
                            >
                                <Sun className="size-5 dark:hidden text-amber-500" />
                                <Moon className="size-5 hidden dark:block text-blue-400" />
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}