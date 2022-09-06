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
                Welcome to Coding Chess
            </h1>
            <p
                style={{
                    textAlign: "center"
                }}>
                A platform to improve your programming skills by solving interactive problems
                <br />
                Solve chess-related problems to improve your coding abilities
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
                <p>Solve Chess Puzzles</p>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "20% 80%",
                    gridTemplateColumns: "100%",
                    backgroundColor: "green"
                }}>
                <p>Improve Coding Skills</p>
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
                            // replace this with chess pieces?
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
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "100%",
                    gridTemplateColumns: "40% 60%"
                }}>
                <div>
                    [Simple image here, use uncode/unsplash prob.]
                </div>
                <div>
                    <h1
                        style={{
                        }}>
                        Become a better programmer
                    </h1>
                    <p
                        style={{
                        }}>
                        Submit code to solve interesting problems<br />
                        Access an organized library of problems [here](problems page)<br />
                        For starters, submit a solution to [this problem](hello world problem), view solution if stuck<br />
                        Check more details about the platform [here](about page)<br />
                        Access different pages easily using the Navbar at the top of the page
                    </p>
                </div>
            </div>
            <Diamonds />
        </div>
    );
};