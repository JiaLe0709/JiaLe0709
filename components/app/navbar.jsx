import Image from "next/image"
import {Button} from "@/components/ui/button"
import {ChevronDown, ChevronUp} from "lucide-react"
import {useState, useEffect} from "react"
import Link from "next/link"
import {motion} from "framer-motion"
import AnimatedThemeToggler from "@/components/magicui/animatedThemeToogle";

export default function Navbar({typeofpage, navTitle}) {
    const [showNav, setShowNav] = useState(false)

    // Only handle click outside, no resize logic needed
    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest("nav")) {
                setShowNav(false)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const isActiveLink = (page) => {
        return typeofpage?.toString() === page ? "dark:text-lime-300 font-bold text-[#59A808]" : ""
    }

    return (
        <div className="fixed top-4 left-4 right-4 lg:left-[13%] lg:right-[13%] xl:left-[13%] xl:right-[13%] z-50">
            <nav className="select-none font-bold w-full h-14
                border-t-3 border-l-3 border-r-[4.5] border-b-[4.5] bg-white border-black text-black
                dark:bg-[#191919] dark:text-slate-50 rounded-full px-6 overflow-visible
                flex items-center justify-between gap-4"
                 style={{
                     isolation: "isolate",
                 }}
            >
                {/* Logo and Title */}
                <div className="flex items-center gap-2 min-w-0">
                    <motion.div
                        whileTap={{scale: 0.8}} // minimize on press
                        animate={{scale: 1}} // default back to normal
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20,
                        }}
                        className="cursor-pointer"
                    >
                        <Image
                            src="https://jiale.imglab-cdn.net/favicon.png?format=avif"
                            alt="logo"
                            width={44}
                            height={44}
                            unoptimized={true}
                            className="flex-shrink-0"
                        />
                    </motion.div>
                    <span className="text-black dark:text-slate-200 whitespace-nowrap truncate">
                        {navTitle}
                    </span>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden lg:flex items-center justify-left">
                    <ul className="flex items-center gap-6">
                        <li>
                            <Link href="/" className={isActiveLink("home")}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className={isActiveLink("blog")}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className={isActiveLink("gallery")}>
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" className={isActiveLink("projects")}>
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={isActiveLink("contact")}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <AnimatedThemeToggler className="items-center size-5 justify-center flex cursor-pointer"/>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu Button - Only shown on mobile */}
                <Button
                    size="sm"
                    variant="ghost"
                    className="lg:hidden rounded-full min-w-[40px] flex items-center gap-1"
                    onClick={() => setShowNav(prev => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    {showNav ? <ChevronUp/> : <ChevronDown/>}
                </Button>

                {/* Mobile Navigation Menu */}
                {showNav && (
                    <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#191919]
                        border-t-3 border-l-3 border-r-5 border-b-5 border-black rounded-3xl p-4
                        max-h-[calc(100vh-6rem)] overflow-y-auto transition-all duration-300 ease-in-out"
                    >
                        <ul className="flex flex-col items-center gap-4">
                            <li>
                                <Link
                                    href="/"
                                    className={isActiveLink("home")}
                                    onClick={() => setShowNav(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className={isActiveLink("blog")}
                                    onClick={() => setShowNav(false)}
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className={isActiveLink("gallery")}
                                    onClick={() => setShowNav(false)}
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className={isActiveLink("projects")}
                                    onClick={() => setShowNav(false)}
                                >
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className={isActiveLink("contact")}
                                    onClick={() => setShowNav(false)}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <button
                                    className="cursor-pointer hover:text-[#59A808] dark:hover:text-lime-300 transition-colors"
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: "Jia Le's Wonderland",
                                                text: `This is the start of something good... and it will get better.\n`,
                                                url: window.location.href,
                                            })
                                        }
                                        setShowNav(false)
                                    }}
                                >
                                    Share
                                </button>
                            </li>
                            <li>
                                <AnimatedThemeToggler/>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    )
}