import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import AnimatedBoard from "./animatedBoard";

// TODO: There is some issue in code, the king also gets taken sometimes, specially by bishop. But I'm not using bishop in any of my codes so...
const AnimatedBoardWrapper = ({ pieces }: any) => {
    const [fen1, setFen1] = useState(findRandomPosition(pieces));

    return (
        <div
            style={{
                pointerEvents: "none",
                overflow: "clip"
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