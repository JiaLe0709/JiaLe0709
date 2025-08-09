// Ref: https://github.com/lucas-dash/Dynamic-Island/blob/main/src/components/Navbar.tsx

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Moon, Sun } from "lucide-react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

export default function Navbar({ navtitle, typeogpage }) {
    const { theme, setTheme } = useTheme()
    const [showNav, setShowNav] = useState(false)
    const [hidden, setHidden] = useState(false)

    const { scrollY } = useScroll()

    // Auto-close nav when scrolling
    useMotionValueEvent(scrollY, "change", latest => {
        const previous = scrollY.getPrevious()
        if (latest !== previous) {
            setShowNav(false)
        }
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    // Close nav when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest("nav")) {
                setShowNav(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    return (
        <motion.nav
            style={{
                position: "fixed",
                zIndex: 9999,
                isolation: "isolate",
            }}
            className={`select-none fixed inset-0 top-4 w-[95%] sm:w-[90%] mx-auto bg-black font-medium text-slate-50 flex max-sm:justify-between gap-4 px-3 max-w-7xl items-center rounded-full font-mono h-14 p-5 overflow-visible`}
            variants={{
                long: { maxWidth: 950 },
                short: { maxWidth: 280 },
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
            initial={"short"}
            animate={[hidden ? "short" : "long", showNav ? "showNav" : "hideNav"]}
            transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 14
            }}
        >
            <div className="min-w-[40px] min-h-[40px] rounded-full gap-2 flex items-center justify-center">
                <Image src={"/favicon.avif"} alt="logo" width={44} height={44} />
            </div>
            <motion.ul
                className={`w-full ${
                    showNav
                        ? "[--display-from:none] [--display-to:flex]"
                        : "max-sm sm:[--display-to:flex]"
                } [--opacity-from:0.1] [--opacity-to:1] flex-col sm:flex-row items-center justify-center gap-10 max-sm:gap-5 max-sm:pt-10`}
                variants={{
                    hidden: {
                        display: "var(--display-from, none)",
                        opacity: "var(--opacity-from, 1)",
                        transition: { duration: 0.1, delay: 0 }
                    },
                    visible: {
                        display: "var(--display-to, none)",
                        opacity: "var(--opacity-to, 1)",
                        transition: { duration: 0.6, delay: 0.2 }
                    }
                }}
                initial={"hidden"}
                animate={[
                    hidden && !showNav ? "hidden" : "visible",
                    showNav ? "visible" : ""
                ]}
            >
                <li>
                    <Link href={"/"} className={typeogpage?.toString() === 'home' ? 'text-lime-300' : ''}>Home</Link>
                </li>
                <li>
                    <Link href={"/blog"} className={typeogpage?.toString() === 'blog' ? 'text-lime-300' : ''}>Blog</Link>
                </li>
                <li>
                    <Link href={"/gallery"} className={typeogpage?.toString() === 'gallery' ? 'text-lime-300' : ''}>Gallery</Link>
                </li>
                <li>
                    <Link href={"/projects"} className={typeogpage?.toString() === 'projects' ? 'text-lime-300' : ''}>Projects</Link>
                </li>
                <li>
                    <Link href={"/contact"} className={typeogpage?.toString() === 'contact' ? 'text-lime-300' : ''}>Contact</Link>
                </li>
                <li>
                    <span
                        className="cursor-pointer"
                        onClick={() => {
                            const shareData = {
                                title: "Jia Le's Wonderland",
                                text: `This is the start of something good... and it will get better.\n`,
                                url: window.location.href,
                            }
                            navigator.share(shareData)
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
                        }}
                    >
                        <Sun className="size-5 dark:hidden text-amber-300" />
                        <Moon className="size-5 hidden dark:block text-blue-400" />
                    </span>
                </li>
            </motion.ul>
            <motion.div
                className="w-full [--display-from:none][--display-to:inline-block]"
                variants={{
                    hidden: {
                        display: "var(--display-from, none)",
                        transition: { delay: 0, duration: 0.3 }
                    },
                    visible: {
                        display: "var(--display-to)",
                        transition: { delay: 0.2, duration: 0.3 }
                    }
                }}
                initial="hidden"
                animate={hidden ? "visible" : "hidden"}
            >
                {navtitle || "Jia Le"}
            </motion.div>
            <Button
                size={"icon"}
                variant={"ghost"}
                className="rounded-full min-w-[40px] sm:hidden"
                onClick={() => {
                    setHidden(false)
                    setShowNav(prev => !prev)
                }}
            >
                {showNav ? <ChevronUp /> : <ChevronDown />}
            </Button>
        </motion.nav>
    )
}
