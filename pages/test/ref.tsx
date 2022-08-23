import { useEffect, useRef } from "react";

const Page = () => {
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        //console.log(ref.current);
        if (ref.current?.style.backgroundColor) {
            //console.log(ref.current?.style.backgroundColor);
        }
    }, []);

    return (<>
        <div
            ref={(el) => {
                if (el) {
                    ref.current = el!;
                }
            }}
            style={{
                backgroundColor: "red"
            }}
        >
            Hello
        </div>
    </>);
}

export default Page;