import React from "react";
import {PiDiscordLogo} from "react-icons/pi";
import * as motion from "motion/react-client"
import { Mail, GithubIcon, AlarmCheckIcon, Egg } from "lucide-react"

const RobloxIcon = () => {
    return (
        <div
            className="w-5 h-5 bg-black dark:bg-white"
            style={{
                maskImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDU2IDU2Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTEuNjc2IDAgMCA0NC4xNjYgNDMuNTc3IDU2bDExLjY3Ni00NC4xNjZ6bTIwLjQwOSAzNS44MjctMTIuMTc3LTMuMzA4IDMuMjY0LTEyLjM0MiAxMi4xODIgMy4zMDh6Ii8+PC9zdmc+")`,
                WebkitMaskImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDU2IDU2Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTEuNjc2IDAgMCA0NC4xNjYgNDMuNTc3IDU2bDExLjY3Ni00NC4xNjZ6bTIwLjQwOSAzNS44MjctMTIuMTc3LTMuMzA4IDMuMjY0LTEyLjM0MiAxMi4xODIgMy4zMDh6Ii8+PC9zdmc+")`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
            }}
        ></div>

    );
};

const Connection = () => {
    const links = [
        {
            id: 1,
            name: "Roblox",
            icon: RobloxIcon,
            links: "https://www.roblox.com/users/2531793177/profile",
            specialIcon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMS42NzYgMCAwIDQ0LjE2NiA0My41NzcgNTZsMTEuNjc2LTQ0LjE2NnpNMzIuMDg1IDM1LjgyN2wtMTIuMTc3LTMuMzA4IDMuMjY0LTEyLjM0MiAxMi4xODIgMy4zMDh6Ii8+PC9zdmc+",
            color: "hover:bg-[#7289DA] hover:text-white  dark:hover:bg-[#7289DA] dark:hover:text-white dark:hover:border-[#6484f5] hover:border-[#5575e6]"
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
                        {Icon === Egg ? <img src={link?.specialIcon} className="w-5 h-5 dark:invert-1" alt={'icon'}/> : <Icon className={'w-5 h-5 '}/>}
                         {link.name}
                    </motion.a>
                );
            })}
        </div>
    );
};

export default Connection;
