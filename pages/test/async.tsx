import { getgid } from "process";

const Page = () => {

    const tt = (): string => {
        let gg = "mmmmmmmmm";

        setTimeout(() => { gg = "Hellow world" }, 1000);

        return gg;
    }
    let bb: string = "bbb";
    const test = async () => {
        console.log("before", bb);

        bb = await tt();

        console.log("later", bb);
    };

    const mn = test();

    return (<></>);
}

export default Page;