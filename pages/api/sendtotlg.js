
export default async function sendtotg(req, res) {
    const TG_TOKEN = process.env.TG_TOKEN
    const TG_CHAT_ID = process.env.TG_CHAT_ID
    const tgUrl = 'https://api.telegram.org/bot' + TG_TOKEN + '/sendMessage'
    const init = {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text:
                "From: " + req.body.name + "\n"
                +"Email: " + req.body.mail + "\n"
                + "Message: " + req.body.message
        })
    }
    const response = await fetch(tgUrl, init)
    if (response.status === 200) {
        res.send({ status: 'Message sent successfully !', error: false })
    } else {
        res.send({ status: 'Failed to send message !', error: true })
    }
}