import { XDiamondFill } from "react-bootstrap-icons";
import AnimatedBoardWrapper from "../chessboard/animated/animatedBoardWrapper";
import AnimatedEditorWrapper from "../editor/animatedEditor";

const PageTop = ({ pieces, code }: any) => {
    return (
        <div
            style={{
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
            <Intro />
            <br />
            <SiteDetailsIntro
                pieces={pieces}
                code={code} />
            <br />
            <HowToUseIt />
        </div>
    );
};

export default PageTop;

const Intro = () => {
    return (
        <div>
            <h1
                style={{
                    textAlign: "center"
                }}>
                Welcome to App
            </h1>
            <p
                style={{
                    textAlign: "center"
                }}>
                A coding platform with interactive problems focused around the game of chess
            </p>
        </div>
    );
};

// less text, more images
const SiteDetailsIntro = ({ pieces, code }: any) => {
    return (
        // just using simple for now as grid items expand with the content
        // can't find a good way to suppress that
        <div
            style={{
                display: "grid",

                gridTemplateColumns: "40% 60%",
                gridTemplateRows: "100%"
            }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "80% 20%",
                    gridTemplateColumns: "100%",
                    backgroundColor: "red"
                }}>
                <AnimatedBoardWrapper
                    pieces={pieces} />
                <p>Solve Chess</p>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "20% 80%",
                    gridTemplateColumns: "100%",
                    backgroundColor: "green"
                }}>
                <p>Using Code</p>
                <AnimatedEditorWrapper
                    fullCode={code} />
            </div>
        </div>
    );
};

const HowToUseIt = () => {
    const Diamonds = () => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                }}>
                {
                    [...Array(6)]
                        .map(
                            k =>
                            (<XDiamondFill
                                key={k}
                                color="royalblue"
                                size={100} />))
                }

            </div>
        );
    };

    return (
        <div>
            <Diamonds />
            <h1
                style={{
                    textAlign: "center"
                }}>
                How to use the site
            </h1>
            <p
                style={{
                    textAlign: "center"
                }}>
                We can submit solution to the problem
                More details can be found in the About section of this site
            </p>
            <Diamonds />
        </div>
    );
};