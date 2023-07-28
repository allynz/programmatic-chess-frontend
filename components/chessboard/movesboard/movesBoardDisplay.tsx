import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import "react-multi-carousel/lib/styles.css";
import Board from "./board";
import CarouselWrapper from "./carouselWrapper";

// https://stackoverflow.com/questions/64995856/what-approach-can-i-use-to-wait-for-all-child-callbacks-to-complete - nice way to communicate betn child to parent
// better naming would be moveList or moves, not movesList as it is both plural and list
// all depends on movesList being valid so keep that in mind
const MovesBoardDisplay = ({ startFen, movesList }: any) => {
    // Current idx of the move
    const [idx, setIdx] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // seems to be some bug here, need to fix it
    const moveLeft = () => {
        setIdx(Math.max(0, idx - 1));
    };
    const moveRight = () => {
        setIdx(Math.min(movesList.length - 1, idx + 1));
    };

    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                //padding: "1rem", // seems  chilren are inheriting padding
                overflow: "scroll",
                display: "grid",
                gap: "1%",
                gridTemplateRows: "10% 75% 10%"
            }}>
            {/* do better naming of params */}
            {/* Cannot keep carousel in center of board rn as it will be too complex sizing as board is also cnetered */}
            <CarouselWrapper
                lodingParentState={() => setLoading(true)}
                lodingParentStateFalse={() => setLoading(false)}
                movesList={movesList}
                idx={idx} />
            <Board
                startFen={startFen}
                movesList={movesList}
                idx={idx} />
            {/* make sure there is space in between them, anyways above will be clipped so button will be usable */}
            <ButtonControl
                moveLeft={moveLeft}
                moveRight={moveRight}
                disabled={loading} />
        </div>
    </>);
};

export default MovesBoardDisplay;

// disable respective button if not used anymore
const ButtonControl = (
    { moveLeft, moveRight, disabled }: any
) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center"
            }}>
            <button className={`centered-container`}
                disabled={disabled}
                onClick={moveLeft}>
                <ChevronLeft />
            </button>
            <button className={`centered-container`}
                disabled={disabled}
                onClick={moveRight}>
                <ChevronRight />
            </button>
        </div>
    );
};