import React from "react";
import {PiDiscordLogo} from "react-icons/pi";
import * as motion from "motion/react-client"
import { Mail, GithubIcon, AlarmCheckIcon } from "lucide-react"

const Connection = () => {
    const links = [
        {
            id: 1,
            name: "Discord",
            icon: PiDiscordLogo,
            links: "https://discord.gg/Muy2b279",
            color: "hover:bg-[#7289DA] hover:text-white dark:hover:bg-[#7289DA] dark:hover:text-white dark:hover:border-[#6484f5] hover:border-[#5575e6]"
        },
        {
            id: 2,
            name: "Email",
            icon: Mail,
            links: "mailto:dev@jiale.in",
            color: "hover:bg-lime-200 dark:hover:bg-lime-200 dark:hover:text-black dark:hover:border-lime-300 hover:border-lime-300"
        },
        {
            id: 3,
            name: "Github",
            icon: GithubIcon,
            links: "https://github.com/jiale0709",
            color: 'hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white'
        },
        {
            id: 4,
            name: "Status",
            icon: AlarmCheckIcon,
            links: 'https://status.jiale.in',
            color: 'hover:bg-[#C76C3F] hover:text-white dark:hover:bg-[#C76C3F] dark:hover:text-white dark:hover:border-[#4F200F] hover:border-[#4F200F] '
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {links.map((link) => {
                const Icon = link.icon;
                return (
                    <motion.a
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.95}}
                        key={link.id}
                        href={link.links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center ${link.color} gap-2 rounded-xl p-3 cursor-pointer border border-t-[2.1] border-l-[2.1] border-r-[4.5] border-b-[4.5] bg-[#F7F7F7] dark:bg-[#232326] dark:text-slate-50 border-black shadow-md`}
                    >
                        <Icon className={'w-5 h-5 '}/> {link.name}
                    </motion.a>
                );
            })}
        </div>
    );
};

export default Connection;
