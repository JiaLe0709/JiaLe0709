import {useEffect, useState} from "react";

const VisitCounter = () => {

    const [counter, setCounter] = useState(null)

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log("Bypass.")
        } else {
            try {
                fetch(process.env.NEXT_PUBLIC_COUNTER_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Takeme': process.env.NEXT_PUBLIC_COUNTER_API_KEY
                    }
                })
                    .then(res => res.json())
                    .then(res => setCounter(res.count))
            } catch (e) {
                throw new Error(e)
            }
        }
    }, [])

    return { counter }
};

export default VisitCounter;