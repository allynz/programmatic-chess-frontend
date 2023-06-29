import { useEffect, useState } from "react";

// Next time, not needed now, figured out a fix
const ProgressBarCustom = () => {
    const [p, setP] = useState<number>(20);
    const percent = p.toString() + '%';
    //console.log("percent", percent);

    useEffect(() => {
        const interval = setInterval(
            () => {
                //console.log("yoooy");
                // what is the diff betn setState(p=>p+1) and setState(p+1);
                setP(p => Math.min(100, p + 1));
            },
            1000
        );

        return () => clearInterval(interval);
    }, []);

    {/* See how to render progressbar with sticky Nav */ }
    {/* Dont set any background color here or for Nav parent, and you'll be fine. Try to use backgroundCOlor: transparent, or opacity if issues occur */ }
    return (<>
        <div
            style={{
                width: "50rem"
            }}>
            <div
                style={{
                    width: percent,
                    height: "1rem",
                    color: "red",
                    backgroundColor: "red"
                }}>

            </div>
        </div>
    </>);
};

export default ProgressBarCustom;