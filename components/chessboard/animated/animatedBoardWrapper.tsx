import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import { Piece } from "../../../chess/types";
import AnimatedBoard from "./animatedBoard";

const AnimatedBoardWrapper = () => {
    const pieces: Array<Piece> = [
        {
            type: 'k',
            color: 'b'
        },
        {
            type: 'r',
            color: 'w'
        },
        {
            type: 'r',
            color: 'w'
        },
        {
            type: 'q',
            color: 'b'
        },
        {
            type: 'b',
            color: 'b'
        },
        {
            type: 'b',
            color: 'w'
        }
    ];
    const [fen1, setFen1] = useState(findRandomPosition(pieces));

    return (
        <div
            style={{
                height: "22rem",
                width: "22rem"
            }}>
            <AnimatedBoard
                startFen={fen1}
                resetFen={() => {
                    setFen1(findRandomPosition(pieces));
                }} />
        </div>
    );
};

export default AnimatedBoardWrapper;