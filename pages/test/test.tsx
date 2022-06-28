import { useEffect, useState } from "react";

const Page = () => {
    const [val, setVal] = useState(0);

    return (<>
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2rem"
            }}>
            <Element a={val} />
            <button
                onClick={() => { setVal(val + 1); }}>
                Incr
            </button>
        </div>
    </>);
}

export default Page;

const Element = ({ a, b, c }: any) => {
    const [s, setS] = useState(a * a);
    const cc = s + 10;

    return (<>
        {s}
        <br></br>
        {cc}
        <button
            onClick={() => { setS(s + 20); }}>
            Incr inside
        </button>
    </>)
}