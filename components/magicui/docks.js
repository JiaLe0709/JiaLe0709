import { Image, HomeIcon, PencilIcon, Send, Share, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { useTheme } from "next-themes"

const DATA = {
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/blog", icon: PencilIcon, label: "Blog" }
    ],
    contact: {
        social: {
            Gallery: {
                name: "Gallery",
                url: "/gallery",
                icon: Image
            },
            Message: {
                name: "Message",
                url: "/contact",
                icon: Send
            },
        }
    }
}

export default function Docks() {

    const { theme, setTheme } = useTheme()

    return (
        <div className=" items-center justify-center">
            <TooltipProvider>
                <Dock direction="middle">
                    {DATA.navbar.map(item => (
                        <DockIcon key={item.label}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        aria-label={item.label}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                    {/*<Separator orientation="vertical" className="h-full"/>*/}
                    {Object.entries(DATA.contact.social).map(([name, social]) => (
                        <DockIcon key={name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={social.url}
                                        aria-label={social.name}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <social.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span
                                    onClick={() => {
                                        const shareData = {
                                            title: "Jia Le's Wonderland 🍵",
                                            text: `This is the start of something good... and it will get better.\n`,
                                            url: window.location.href,
                                        };
                                        navigator.share(shareData);
                                    }}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                        "size-12 rounded-full"
                                    )}
                                >
                                    <Share className="size-4" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Share</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                    <DockIcon>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span
                                    onClick={() => {
                                        setTheme(theme === "dark" ? "light" : "dark")
                                    }}
                                >
                                    <Sun className="size-4 dark:hidden" />
                                    <Moon className="size-4 hidden dark:block" />
                                </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{'Theme: '}{theme?.charAt(0).toUpperCase() + theme?.slice(1)}</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        </div>
    )
}
