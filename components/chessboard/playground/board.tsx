import { Chess, Piece, SQUARES } from "chess.js";
import { Dests, Key } from "chessground/types";
import { useState } from "react";
import 'react-chessground/dist/styles/chessground.css';
import Chessboard from "./chessboard";
import { findRandomPosition } from "./positionFinder";

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
        },
        {
            type: 'k',
            color: 'w'
        }
    ];

    const [fen, setFen] = useState<string>(findRandomPosition(piecesDefault)); // empty is needed as otherwise it's undefined which causes issues

    return (<>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                margin: "3rem"
            }}>
            <Chessboard startFen={fen} />
            <div style={{ margin: "5rem" }}>
                {/* TODO: Also set button to loading */}
                <button
                    onClick={() => {
                        const randomFen = findRandomPosition(piecesDefault);
                        setFen(randomFen);
                    }}>
                    Generate new Pos
                </button>
            </div>
        </div>

    </>);
}

export default PlaygroundBoard;

