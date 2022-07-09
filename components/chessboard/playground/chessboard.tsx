import { Dests, Key } from "chessground/types";
import { useEffect, useState } from "react";
import { Chess } from "../../../chess";
import { Status } from "../../../chess/config";
import { Move, Square } from "../../../chess/types";
import ChessboardInternal from "./chessboardInternal";
import StatusDisplay from "./statusDisplay";

type Props = {
    startFen: string,
    newPositionGeneration: () => void
}

const Chessboard = ({ startFen, newPositionGeneration }: Props) => {
    const [chess, setChess] = useState<Chess>(new Chess(startFen));
    const [gameStatus, setGameStatus] = useState<Status>(chess.getStatus());

    // TODO: combine this into one state so I can update them together
    const [moveAllowed, setMoveAllowed] = useState<boolean>(true);
    const [state, setState] = useState<{ fen: string, validMoves: Dests }>(
        {
            fen: chess.getFen(),
            validMoves: convertMoveToMap(chess.validMoves())
        }
    );

    console.log("chessboard");

    const updateStateOnMove = (timeoutMs?: number | undefined) => {
        setMoveAllowed(false);
        setTimeout(() => {
            setState({
                fen: chess.getFen(),
                validMoves: convertMoveToMap(chess.validMoves())
            });
            setGameStatus(chess.getStatus());
        }, timeoutMs);

        setMoveAllowed(true);
    };

    const moveFunction = (orig: Key, dest: Key) => {
        // Keep on playing even with insufficient material
        if (!moveAllowed || gameStatus in [Status.CHECKMATE, Status.STALEMATE]) return;

        // dont need to check validity here as we had only allowed valid moves, but its fine for now in general
        let moved = chess.move(orig as Square, dest as Square);
        if (!moved) {
            return;
        }

        // if its not a valid move then undo, but from ground as 'chess' has not even made the move, how though?
        const possibleMoves = chess.validMoves();
        if (possibleMoves.length === 0) {
            updateStateOnMove(0);
            return;
        }

        const randomIdx = Math.floor(Math.random() * possibleMoves.length);
        moved = chess.move(possibleMoves[randomIdx].orig, possibleMoves[randomIdx].dest, true);
        console.log(moved);
        if (!moved) {
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

    return (<>
        <div
            style={{
                height: "100%",
                width: "100%",
                padding: "1rem",
                overflow: "clip",
                display: "grid",
                gridTemplateRows: "10% 5% 70% 5% 10%",
                gridTemplateColumns: "100%"
            }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "1rem"
                }}>
                {/* Stick to your normal button, can't tinker with this one */}
                <button onClick={newPositionGeneration}>
                    Generate random position
                </button>
                <button
                    disabled={state.fen === startFen}
                    onClick={() => {
                        // check more on this condition
                        if (gameStatus in [Status.CHECKMATE, Status.STALEMATE]) {
                            chess.undo();
                            setGameStatus(chess.getStatus());
                        } else {
                            // need to undo 2 times here, see if we should handle this inside board itself
                            chess.undo();
                            chess.undo();
                        }
                        updateStateOnMove();
                    }}>
                    Undo move
                </button>
            </div>

            <br />

            <ChessboardInternal
                fen={state.fen}
                validMoves={state.validMoves}
                moveFunction={moveFunction} />

            <br />

            <StatusDisplay status={gameStatus} />
        </div>
    </>);
};

export default Chessboard;

const convertMoveToMap = (moves: Array<Move>): Dests => {
    const mp = new Map<Key, Array<Key>>();
    moves.forEach(
        move => mp.set(move.orig, []));
    // TODO: see if we can update map in place
    moves.forEach(
        move => mp.set(move.orig, [...mp.get(move.orig)!, move.dest]));

    console.log("moves", mp);

    return mp;
}