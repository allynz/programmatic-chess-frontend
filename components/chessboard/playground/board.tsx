import { Chess, Piece, SQUARES } from "chess.js";
import { Dests, Key } from "chessground/types";
import { useState } from "react";
import 'react-chessground/dist/styles/chessground.css';
import Chessboard from "./chessboard";
import { findRandomPosition } from "../../../chess/positionFinder";

const PlaygroundBoard = () => {
    const piecesDefault: Array<Piece> = [
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
        }
    ];

    const generateNewPosition = () => {
        const randomFen = findRandomPosition(piecesDefault);
        setFen(randomFen);
    };

    const [fen, setFen] = useState<string>(findRandomPosition(piecesDefault)); // empty is needed as otherwise it's undefined which causes issues

    return (<>
        <div
            style={{
                // change height and width to 100%
                height: "50rem",
                width: "30rem"
            }}>
            <Chessboard startFen={fen} newPositionGeneration={generateNewPosition} />
        </div>
    </>);
}

export default PlaygroundBoard;

