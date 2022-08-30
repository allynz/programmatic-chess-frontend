import AnimatedBoardWrapper from "../../components/chessboard/animated/animatedBoardWrapper";

const Page = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw"
            }}>
            <AnimatedBoardWrapper />
            <div>
                Hellop
            </div>
        </div>
    );
}

export default Page;