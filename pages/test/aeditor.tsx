import AnimatedEditor from "../../components/editor/animatedEditor";

const Page = () => {
    return (
        <div
            style={{
                height: "10rem",
                width: "100vw"
            }}>
            <AnimatedEditor
                fullCode={`
                Hello
                My name is whay
                My name is what
                My name 
                chicha chicha
                slim shady
                DO we know
                Hello
                My name is whay
                My name is what
                `} />
        </div>
    );
};

export default Page;