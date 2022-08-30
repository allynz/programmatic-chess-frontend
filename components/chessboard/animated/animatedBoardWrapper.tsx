import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import AnimatedBoard from "./animatedBoard";

// TODO: There is some issue in code, the king also gets taken sometimes, specially by bishop
const AnimatedBoardWrapper = ({ pieces }: any) => {
    const [fen1, setFen1] = useState(findRandomPosition(pieces));

    return (
        <div
            style={{
                height: "22rem",
                width: "22rem",
                pointerEvents: "none"
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