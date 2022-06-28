import { Chess, SQUARES } from "chess.js";
import { Chessground } from "chessground";
import { Api } from "chessground/api";
import { Config } from "chessground/config";
import { move } from "chessground/drag";
import { Dests, Key } from "chessground/types";
import { useEffect, useState } from "react";
import 'react-chessground/dist/styles/chessground.css';
import ChessboardInternal from "./chessboardInternal";

type Props = {
    startFen: string
}

// TODO: Make a better react library for chess, as this using JS is causing a whole lot of trouble using useEffect and setState
// it's highlighting last move even when position changed, look into that
// also need to wait for all updates to be completed before moving forward
// Wow, just use const vars if in doubt, no setState needed
const Chessboard = ({ startFen }: Props) => {
    const [chess, setChess] = useState(new Chess(startFen)); // setState updates const vars also so need to make this stateful, or maybe make it top-level?

    // setState updates probably happen after useEffect is completed, and are reflected in the browser for that reason
    // cannot use useState vars as const vars as they are not updated by prop changes, only using setState. const vars update on any changes
    // TODO: combine this into one state so I can update them together
    const [moveAllowed, setMoveAllowed] = useState<boolean>(true);
    const [state, setState] = useState({
        fen: startFen,
        validMoves: getValidMoves(startFen)
    });

    // boardConfig is a derived state so handle that correctly
    const moveFunction = (orig: Key, dest: Key) => {
        console.log("moveall", moveAllowed);
        console.log("before", chess.moves().length);
        if (!moveAllowed) return;

        const moveString = orig.toString() + "-" + dest.toString();
        console.log(moveString);
        let moved = chess.move(moveString, { sloppy: true });
        if (!moved) {
            console.log("Not moved");
            return;
        }
        // if its not a valid move then undo, but from ground as 'chess' has not even made the move, how though? AHHHHHH!
        // have custom game over condition as we dont have 2 kings always

        const possibleMoves = chess.moves({ verbose: true });
        if (possibleMoves.length === 0) return; // take care of equality in JS

        const randomIdx = Math.floor(Math.random() * possibleMoves.length);
        moved = chess.move(possibleMoves[randomIdx]);
        console.log(moved);
        if (!moved) {
            console.log("Not moved");
            return;
        }
        console.log("after", chess.history({ verbose: true }));
        console.log("after", chess.moves().length);
        setMoveAllowed(false);
        setTimeout(() =>
            setState({
                fen: chess.fen(),
                validMoves: getValidMoves(chess.fen())
            }), 200);
        setMoveAllowed(true);
    };

    useEffect(() => {
        setState({
            fen: startFen,
            validMoves: getValidMoves(startFen)
        });
        setMoveAllowed(true); // this could be tricky
        setChess(new Chess(startFen));
    }, [startFen]);

    // // does this override the whole config? prob, except viewOnly and drawable as written in doc
    // // setState changes are prob not present inside useEffect, they will run after useEffect is over
    // useEffect(() => {
    //     console.log("moves", moves);
    //     ground?.set(boardConfig); // this is JS so it shows up instantly, otherwise useState will have delay and prob not even update in this loop
    // }, [startFen]); // or set the whole props as dependencies if all are related to chess, anyway update this if props is updated

    return (<>
        <ChessboardInternal
            fen={state.fen}
            validMoves={state.validMoves}
            moveFunction={moveFunction} />
    </>);
};

export default Chessboard;

// check if this state can be updated dynamically if global var, or update it when board gets updated - have both those as states in useState. Another option is to have array of useStates for each square for map, and then just update the required ones
// see if this logic can be shifted inside chessboard itself
const getValidMoves = (fen: string): Dests => {
    const chess = new Chess(fen);
    const map: Dests = new Map();
    for (const square of SQUARES) {
        map.set(
            square,
            chess.moves({ square: square, verbose: true })
                .map(move => move.to));
    }

    //console.log("movemap", map);

    return map;
};