import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Board from "./board";
import CarouselWrapper from "./carouselWrapper";

// https://stackoverflow.com/questions/64995856/what-approach-can-i-use-to-wait-for-all-child-callbacks-to-complete - nice way to communicate betn child to parent
// better naming would be moveList or moves, not movesList as it is both plural and list
const MovesBoardDisplay = ({ movesList }: { movesList: any }) => {
    // Current idx of the move
    const [idx, setIdx] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const moveLeft = () => {
        setIdx(Math.max(0, idx - 1));
    };
    const moveRight = () => {
        setIdx(Math.min(movesList.length - 1, idx + 1));
    };

    return (<>
        <div style={{ margin: "10rem" }}>
            {/* do better naming of params */}
            <CarouselWrapper
                lodingParentState={() => setLoading(true)}
                lodingParentStateFalse={() => setLoading(false)}
                movesList={movesList}
                idx={idx} />
            <BoardWrapper movesList={movesList} idx={idx} />
            <ButtonControl
                moveLeft={moveLeft}
                moveRight={moveRight}
                disabled={loading}
            />
        </div>
    </>);
};

export default MovesBoardDisplay;

// Renaming symbol doesnt traverse across child, so be careful of that
const BoardWrapper = ({ idx, movesList }: any) => {
    const config = {
        height: "15rem",
        width: "15rem"
    };

    return (<>
        <Board config={config} movesList={movesList} idx={idx} />
    </>);
};

// disable respective button if not used anymore
const ButtonControl = (
    { moveLeft, moveRight, disabled }: any
) => {
    return (<>
        <button
            disabled={disabled}
            onClick={moveLeft}>
            Left
        </button>
        <button
            disabled={disabled}
            onClick={moveRight}>
            Right
        </button>
    </>);
};