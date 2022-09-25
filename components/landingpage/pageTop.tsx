import { random } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { BrightnessAltHighFill, Icon } from "react-bootstrap-icons";
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
    // TOOD: Increase font size of text throughout page, it is not that readable for homepage
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
                gridTemplateRows: "100%",

                backgroundColor: "lightgreen",
                padding: "1rem"
            }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "80% 20%",
                    gridTemplateColumns: "100%"
                }}>
                {/* TODO: On big screens, board doesn't look good, see what we can do about it, maybe make it's background black? */}
                <AnimatedBoardWrapper
                    pieces={pieces} />
                <p
                    style={{
                        fontSize: "2rem",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    SOLVE CHESS PUZZLES
                </p>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: "20% 80%",
                    gridTemplateColumns: "100%"
                }}>
                <p
                    style={{
                        fontSize: "2rem",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    IMPROVE CODING SKILLS
                </p>
                <AnimatedEditorWrapper
                    fullCode={code} />
            </div>
        </div>
    );
};

const HowToUseIt = () => {
    const Diamonds = ({ transform }: any) => {
        const iconList: Array<Icon> = [
            BrightnessAltHighFill
        ];

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "1rem"
                }}>
                {
                    [...Array(6)]
                        .map(
                            k => {
                                const RandomIcon = iconList[random(iconList.length - 1)];
                                // replace this with chess pieces?
                                return (
                                    <RandomIcon
                                        style={{
                                            transform: transform
                                        }}
                                        key={k}
                                        color="royalblue"
                                        size={100} />
                                );
                            })
                }
            </div>
        );
    };

    return (
        <div
            style={{
                paddingTop: "15rem" // TODO: This stuff should really be handled by the above layer
            }}>
            <Diamonds transform={"rotate(0deg)"} />
            <div
                style={{
                    display: "grid",
                    height: "15rem",
                    gridTemplateRows: "100%",
                    gridTemplateColumns: "40% 60%"
                }}>
                <Image
                    src={`https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2942&q=80`}
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                    objectFit="contain"
                />
                <div>
                    <h1>
                        Become a better programmer
                    </h1>
                    <p>
                        Write code to solve interesting problems<br />
                        Access an organized library of problems <strong>[<Link href={`/problem`}>here</Link>]</strong> <br />
                        For starters, submit a solution to <strong>[<Link href={`/problem/1000`} >this problem</Link>]</strong>, view solution if stuck<br />
                        Check more details about the platform <strong>[<Link href={`/about`} >here</Link>]</strong> <br />
                        Access different pages easily using the Navbar at the top of the page
                    </p>
                </div>
            </div>
            <Diamonds transform={"rotate(-180deg)"} />
        </div>
    );
};