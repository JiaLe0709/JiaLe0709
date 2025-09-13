import { useEffect, useState } from "react";

let cachedCounter = null;

const VisitCounter = () => {
    const [counter, setCounter] = useState(cachedCounter);

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            console.log("Bypass.");
        } else if (cachedCounter === null) {
            fetch(process.env.NEXT_PUBLIC_COUNTER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Takeme: process.env.NEXT_PUBLIC_COUNTER_API_KEY,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    cachedCounter = res.count
                    setCounter(res.count);
                })
                .catch(console.error);
        }
    }, []);

    return { counter };
};

export default VisitCounter;
