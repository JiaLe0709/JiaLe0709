import Layout from "@/layouts/globals";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {ShimmerButton} from "@/components/magicui/shimmer-button";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import {Send, Loader2Icon} from "lucide-react";
import {toast, Toaster} from "sonner";
import {Turnstile} from '@marsidev/react-turnstile'
import {Highlighter} from "@/components/magicui/highlighter";

const Message = () => {

    const [passedVerify, setPassedVerify] = useState(false)
    const [loading, setLoading] = useState(false)

    async function sentMessage(e) {
        e.preventDefault()
        setLoading(true)

        const tgUrl = '/api/sendtotlg'
        const res = await fetch(tgUrl, {
            body: JSON.stringify({
                name: e.target.name.value,
                mail: e.target.email.value,
                message: e.target.message.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        // await res.json()
        const result = await res.json()
        if (result.error) {
            toast.error(result.status)
            setLoading(false)
        } else {
            setLoading(false)
            toast.success(result.status)
            e.target.reset()
        }

    }

    return (
        <>
            <Layout
                navTitle={'Contact'}
                path={'/contact'}
                typeOfPage={'contact'}
                title={"Jia Le's Pigeon"}
                description={"Share your suggestions / bug reports through this page !"}
            >
                <br/>
                <Toaster richColors={true} position={'top-center'}/>
                <div
                    className={`max-w-screen-md flex flex-col mx-auto p-3`}
                >
                    <div className={'flex flex-col items-center justify-center space-y-4'}>
                        <Image src={'https://jiale.imglab-cdn.net/pigeon.png?format=avif'} alt={'Pigeon icon'} width={150} height={120} unoptimized={true}/>
                        <h3 className={'text-xl text-center font-extrabold'}>
                            {"Share your  "}
                            <Highlighter color={'#87CEFA'}><span className={'text-black'}>suggestions</span></Highlighter>
                            {"  through this page !"}
                        </h3>
                    </div>
                </div>
                <form
                    className='max-w-screen-md mx-auto  space-y-2'
                    autoComplete="off"
                    onSubmit={sentMessage}
                >
                    <div className='max-w-screen-md grid sm:grid-cols-2 gap-3 mx-auto p-2'>
                        <div className={'space-y-2 '}>
                            <Label htmlFor='name' className={'text-[17px] '}>Name</Label>
                            <Input required id='name' name='name' type="text" placeholder="Name"/>
                        </div>
                        <div className={'space-y-2'}>
                            <Label htmlFor='mail' className={'text-[17px] '}>Email</Label>
                            <Input id='mail' required name='email' type="email" placeholder="Email"/>
                        </div>
                        <div className='sm:col-span-2 space-y-2'>
                            <Label htmlFor='message' className={'text-[17px] '}>Message</Label>
                            <Textarea required className='h-40' id='message' name='message'
                                      placeholder="Type your message here."/>
                        </div>
                        <span>Or click here to <a className={'font-bold text-[#7B981E]'} href={`mailto:dev@jiale.in?subject=${encodeURIComponent('Bug report / Feature suggestion')}&body=${encodeURIComponent('Web URL / Path:\nBugs / Suggestion:\n')}`}
                        >email</a> me.</span>
                    </div>
                    <Turnstile
                        siteKey={process.env.NEXT_PUBLIC_CF_SITE_KEY}
                        className={'ml-4 rounded-2xl'}
                        onSuccess={() => setPassedVerify(true)}
                        onError={() => setPassedVerify(false)}
                        onExpire={() => setPassedVerify(false)}
                    />
                    <ShimmerButton type="submit" className={'h-10 ml-4'} disabled={loading || !passedVerify}>
                        <span
                            className="flex items-center justify-center space-x-2 text-white transition-all duration-300 ease-in-out hover:text-neutral-600 dark:text-neutral-400">
                            {loading ? <Loader2Icon className={'w-4 h-4 mr-2 animate-spin'}/> :
                                <Send className={'w-4 h-4 mr-2'}/>}
                            Send
                        </span>
                    </ShimmerButton>
                </form>
            </Layout>
            <br/>
        </>
    )
}

export default Message