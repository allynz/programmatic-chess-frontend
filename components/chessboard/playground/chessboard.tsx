import { Dests, Key } from "chessground/types";
import { useEffect, useState } from "react";
import 'react-chessground/dist/styles/chessground.css';
import { Chess } from "../../../chess";
import { Move, Square } from "../../../chess/types";
import ChessboardInternal from "./chessboardInternal";
import StatusDisplay from "./statusDisplay";

type Props = {
    startFen: string,
    newPositionGeneration: () => void
}

// TODO: Make a better react library for chess, as this using JS is causing a whole lot of trouble using useEffect and setState
// it's highlighting last move even when position changed, look into that
// also need to wait for all updates to be completed before moving forward
// Wow, just use const vars if in doubt, no setState needed
const Chessboard = ({ startFen, newPositionGeneration: newPositionGneration }: Props) => {
    const [chess, setChess] = useState(new Chess(startFen)); // setState updates const vars also so need to make this stateful, or maybe make it top-level?
    // make sure this is updated really only when valid moves are 0
    const [gameStatus, setGameStatus] = useState(chess.getStatus());

    // setState updates probably happen after useEffect is completed, and are reflected in the browser for that reason
    // cannot use useState vars as const vars as they are not updated by prop changes, only using setState. const vars update on any changes
    // TODO: combine this into one state so I can update them together
    const [moveAllowed, setMoveAllowed] = useState<boolean>(true);
    const [state, setState] = useState({
        fen: startFen,
        validMoves: convertMoveToMap(chess.validMoves())
    });

    // check on undefined timwout - it should default to 0
    const updateStateOnMove = (timeoutMs?: number | undefined) => {
        setMoveAllowed(false);
        setTimeout(() => {
            // have these setStates together, or combine to one; if set separately, then multiple renders of board can occur
            setState({
                fen: chess.getFen(),
                validMoves: convertMoveToMap(chess.validMoves())
            });
            setGameStatus(chess.getStatus());
        }, timeoutMs);

        setMoveAllowed(true);
    };

    // boardConfig is a derived state so handle that correctly
    const moveFunction = (orig: Key, dest: Key) => {
        console.log("moveall", moveAllowed);
        console.log("before", chess.validMoves().length);
        // Keep on playing even with insufficient material
        if (!moveAllowed || gameStatus === "Checkmate" || gameStatus === "Stalemate") return;

        const moveString = orig.toString() + "-" + dest.toString();
        console.log(moveString);
        let moved = chess.move(orig as Square, dest as Square);
        if (!moved) {
            console.log("Not moved");
            return;
        }
        // if its not a valid move then undo, but from ground as 'chess' has not even made the move, how though? AHHHHHH!
        // have custom game over condition as we dont have 2 kings always

        const possibleMoves = chess.validMoves();
        if (possibleMoves.length === 0) {
            updateStateOnMove(0); // somethings fishy here, on left and rhs side of board it repeats, but on bottom side it doesn't
            return; // take care of equality in JS
        }

        const randomIdx = Math.floor(Math.random() * possibleMoves.length);
        moved = chess.move(possibleMoves[randomIdx].orig, possibleMoves[randomIdx].dest);
        console.log(moved);
        if (!moved) {
            console.log("Not moved");
            return;
        }
        updateStateOnMove(200);
    };

    useEffect(() => {
        const currChess = new Chess(startFen);
        setChess(currChess);
        setState({
            fen: startFen,
            validMoves: convertMoveToMap(currChess.validMoves())
        });
        setMoveAllowed(true); // this could be tricky
        setGameStatus(currChess.getStatus());
    }, [startFen]);

    // // does this override the whole config? prob, except viewOnly and drawable as written in doc
    // // setState changes are prob not present inside useEffect, they will run after useEffect is over
    // useEffect(() => {
    //     console.log("moves", moves);
    //     ground?.set(boardConfig); // this is JS so it shows up instantly, otherwise useState will have delay and prob not even update in this loop
    // }, [startFen]); // or set the whole props as dependencies if all are related to chess, anyway update this if props is updated

    // dont let elements handle their padding, use gap or <br>
    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                padding: "5rem",
                overflow: "clip"
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around"
                }}>
                <button
                    /* TODO: Also set button to loading */
                    onClick={newPositionGneration}>
                    Generate random position
                </button>
                <button
                    onClick={() => {
                        if (gameStatus !== "Playing") {
                            chess.undo();
                            setGameStatus(chess.getStatus());
                        } else {
                            // not an issue but see if we can have smoother transition
                            chess.undo();
                            chess.undo(); // need to undo 2 times
                        }
                        updateStateOnMove();
                    }}>
                    Undo last move
                </button>
            </div>
            <br></br>
            <ChessboardInternal
                fen={state.fen}
                validMoves={state.validMoves}
                moveFunction={moveFunction} />
            <br></br>
            <StatusDisplay status={gameStatus} />
        </div>
    </>);
};

export default Chessboard;

const convertMoveToMap = (moves: Array<Move>): Dests => {
    const mp = new Map<Key, Array<Key>>();
    moves.forEach(
        move => mp.set(move.orig, []));
    // see if we can update map in place
    moves.forEach(
        move => mp.set(move.orig, [...mp.get(move.orig)!, move.dest]));

    //console.log("mpmoves", mp);

    return mp;
}