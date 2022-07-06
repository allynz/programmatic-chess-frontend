import { Chess, Piece, SQUARES } from "chess.js";
import { Dests, Key } from "chessground/types";
import { useState } from "react";
import Chessboard from "./chessboard";
import { findRandomPosition } from "../../../chess/positionFinder";

const PlaygroundBoard = ({ pieces }: any) => {
    const generateNewPosition = () => {
        const randomFen = findRandomPosition(pieces);
        setFen(randomFen);
    };

    const [fen, setFen] = useState<string>(findRandomPosition(pieces)); // empty is needed as otherwise it's undefined which causes issues

    return (<>
        <div
            style={{
                // change height and width to 100%
                height: "100%",
                width: "100%"
            }}>
            <Chessboard startFen={fen} newPositionGeneration={generateNewPosition} />
        </div>
    </>);
}

export default PlaygroundBoard;

