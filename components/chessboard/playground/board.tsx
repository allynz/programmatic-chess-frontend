import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import Chessboard from "./chessboard";

// TODO: sometimes the board gets hung up, see what it is about, prob some error with valid moves map
const PlaygroundBoard = ({ pieces }: any) => {
    const generateNewPosition = () => {
        const randomFen = findRandomPosition(pieces);
        setFen(randomFen);
    };

    const [fen, setFen] = useState<string>(findRandomPosition(pieces));

    return (<>
        <div
            style={{
                height: "100%",
                width: "100%"
            }}>
            <Chessboard
                startFen={fen}
                newPositionGeneration={generateNewPosition} />
        </div>
    </>);
}

export default PlaygroundBoard;

