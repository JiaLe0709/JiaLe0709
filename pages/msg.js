import Layout from "@/layouts/globals";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Send} from "lucide-react";

const Message = () => {

    const [result, setResult] = useState('')

    async function sentMessage(e) {
        e.preventDefault()
        const tgUrl = '/api/sendtotlg'
        const res = await fetch(tgUrl, {
            body: JSON.stringify({
                name: e.target.name.value,
                mail: e.target.mail.value,
                message: e.target.message.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        // await res.json()
        const result = await res.json()
        console.log(result.status)
    }

    return (
        <>
            <Layout>
                <div
                    className={`max-w-screen-md flex flex-col mx-auto p-4 pt-8`}
                >
                    <div className={'flex flex-col items-center justify-center space-y-4'}>
                        <Image src={'/letters.png'} alt={'Jia Le @ Letters Cat'} width={170} height={150}/>
                        <h3 className={'text-xl text-center font-extrabold'}>{"Feel free to share your "}
                            <span className={'underline font-bold text-[#86a31e]'}>suggestions</span>
                            {" through this page!"}
                        </h3>
                    </div>


                </div>
                <form
                    autoComplete='off'
                    className='max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto p-4 space-y-2'
                    onSubmit={sentMessage}
                >
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
                        <Textarea required className='h-50' id='message' name='message' placeholder="Type your message here."/>
                    </div>
                    <ShimmerButton type="submit" className={'cursor-pointer font-extrabold h-10'}>
                        <Send className={'w-4 h-4 mr-2'}/>
                        Send
                    </ShimmerButton>
                </form>
            </Layout>
        </>
    )
}

export default Message