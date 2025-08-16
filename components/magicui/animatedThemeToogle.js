import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function AnimatedThemeToggler({ className }) {
    const {setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const changeTheme = async (e) => {
        const buttonEl = e.currentTarget

        await document.startViewTransition(() => {
            flushSync(() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            })
        }).ready

        const rect = buttonEl.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        const right = window.innerWidth - rect.left
        const bottom = window.innerHeight - rect.top
        const maxRad = Math.hypot(Math.max(rect.left, right), Math.max(rect.top, bottom))

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRad}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 700,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)"
            }
        )
    }

    if (!mounted) {
        return (
            <button disabled>
            </button>
        )
    }

    return (
        <button onClick={changeTheme} className={className}>
            {resolvedTheme === "dark" ? (
                <Moon className="size-5 text-blue-400" />
            ) : (
                <Sun className="size-5 text-amber-500" />
            )}
        </button>
    )
}
