import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Navbar({ typeogpage, navTitle }) {
    const { theme, setTheme } = useTheme()
    const [showNav, setShowNav] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        function handleResize() {
            const desktop = window.innerWidth >= 640
            setIsDesktop(desktop)
            if (desktop) {
                setShowNav(false) // close mobile nav when switching to desktop
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest("nav") && !isDesktop) {
                setShowNav(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [isDesktop])

    return (
        <motion.nav
            style={{
                position: "fixed",
                zIndex: 1,
                isolation: "isolate",
            }}
            className="select-none fixed inset-0 top-4 w-[95%] sm:w-[90%] mx-auto bg-black font-medium text-slate-50 flex max-sm:justify-between gap-4 px-3 max-w-7xl items-center rounded-full font-mono h-14 p-5 overflow-visible"
            variants={{
                long: { maxWidth: 950 },
                hideNav: {
                    height: 56,
                    borderRadius: 50,
                    alignItems: "center",
                    transition: { delay: 0, duration: 0.3 }
                },
                showNav: {
                    height: 370,
                    borderRadius: 22,
                    alignItems: "start",
                    transition: { delay: 0 }
                }
            }}
            initial="long"
            animate={[showNav ? "showNav" : "hideNav", "long"]}
            transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 14
            }}
        >
            <div className="flex items-center gap-2">
                <Image src="/favicon.avif" alt="logo" width={44} height={44} />
                <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{navTitle}</span>
            </div>

            <motion.ul
                className={`w-full ${
                    isDesktop || showNav
                        ? "flex"
                        : "hidden"
                } flex-col sm:flex-row items-center justify-center gap-10 max-sm:gap-5 max-sm:pt-10`}
                variants={{
                    hidden: {
                        opacity: 0,
                        transition: { duration: 0.1, delay: 0 }
                    },
                    visible: {
                        opacity: 1,
                        transition: { duration: 0.6, delay: 0.2 }
                    }
                }}
                initial="visible"
                animate={isDesktop || showNav ? "visible" : "hidden"}
            >
                <li>
                    <Link href="/" className={typeogpage?.toString() === "home" ? "text-lime-300" : ""}>Home</Link>
                </li>
                <li>
                    <Link href="/blog" className={typeogpage?.toString() === "blog" ? "text-lime-300" : ""}>Blog</Link>
                </li>
                <li>
                    <Link href="/gallery" className={typeogpage?.toString() === "gallery" ? "text-lime-300" : ""}>Gallery</Link>
                </li>
                <li>
                    <Link href="/projects" className={typeogpage?.toString() === "projects" ? "text-lime-300" : ""}>Projects</Link>
                </li>
                <li>
                    <Link href="/contact" className={typeogpage?.toString() === "contact" ? "text-lime-300" : ""}>Contact</Link>
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
                        }}
                    >
                        Share
                    </span>
                </li>
                <li>
                    <span
                        className="cursor-pointer"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="size-5 dark:hidden text-amber-300" />
                        <Moon className="size-5 hidden dark:block text-blue-400" />
                    </span>
                </li>
            </motion.ul>

            <Button
                size="sm"
                variant="ghost"
                className="rounded-full min-w-[40px] sm:hidden flex items-center gap-1"
                onClick={() => setShowNav(prev => !prev)}
            >
                {showNav ? <ChevronUp /> : <ChevronDown />}
            </Button>
        </motion.nav>
    )
}
