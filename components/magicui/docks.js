import { Image, HomeIcon, PencilIcon, Mail, Send } from "lucide-react"
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
                url: "/msg",
                icon: Mail
            },
            Email: {
                name: "Send Email",
                url: "mailto:jle26531@gmail.com",
                icon: Send
            },
        }
    }
}

export default function Docks() {
    return (
        <div className="flex flex-col items-center justify-center">
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
                </Dock>
            </TooltipProvider>
        </div>
    )
}
