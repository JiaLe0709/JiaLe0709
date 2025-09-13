import {WordRotate} from "@/components/magicui/word-rotate";

const GreetingTitle = () => {

    const greetingWords = [
        "Hi",
        "Hello",
        "Hey",
        "Yo",
        "Sup",
        "Wassup",
        "G’day",
        "Ayy 👋"
    ]

    return (
        <>
            <div className={'flex flex-row items-center justify-center'}>
                <WordRotate words={greetingWords} duration={3500} className={"inline-block"} extraSting={","}/>&nbsp;{"I am Jia Le"}
            </div>
        </>
    )
}

export default GreetingTitle