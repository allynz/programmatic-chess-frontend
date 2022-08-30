import AnimatedBoardWrapper from "../chessboard/animated/animatedBoardWrapper";

const PageTop = () => {
    return (
        <div
            style={{
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
            <Intro />
            <SiteDetailsIntro />
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
const SiteDetailsIntro = () => {
    return (
        <div
            style={{
                clear: "both"
            }}>
            {/* No need for heading, it is intuitive */}
            <p
                style={{
                }}>
                {/* Should I make this animated or just plain? Main thing is no distraction */}
                {/* <img
                    alt={`Random Chessboard`}
                    height="20%"
                    width="20%"
                    src="/images/randomChessboard.png" /> */}
                <AnimatedBoardWrapper />
                Hello, this is an image
            </p>
            <div
                style={{
                    textAlign: "right"
                }}>
                Hello, this is an image I like
                {/* Show code editor here, can add animating code or empty editor etc. */}
                <img
                    alt={`Random Code`}
                    style={{
                        maxHeight: "20rem"
                    }}
                    src="/images/randomCode.png" />
            </div>
        </div>
    );
};

const HowToUseIt = () => {
    return (
        <div>
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
        </div>
    );
};