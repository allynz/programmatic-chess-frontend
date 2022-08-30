import { useEffect, useState } from "react";
import { Chess } from "../../../chess";
import AnimatedBoardInternal from "./animatedBoardInternal";

// can I use variables inside in random order?
const AnimatedBoard = ({ startFen, resetFen }: any) => {
    const [fen, setFen] = useState(startFen);
    const [chess, setChess] = useState(new Chess(fen));
    //const chess = new Chess(fen);
    const moveFunction = () => {
        const possibleMoves = chess.validMoves();
        if (possibleMoves.length === 0) {
            return;
        }

        const randomIdx =
            Math.floor(Math.random() * possibleMoves.length);
        let moved = chess.move(
            possibleMoves[randomIdx].orig,
            possibleMoves[randomIdx].dest,
            true);
        //console.log(moved);
        if (!moved) {
            return;
        }

        setFen(chess.getFen());
    };

    const [moveMade, setMoveMade] =
        useState({ orig: "", dest: "" });

    useEffect(() => {
        setChess(new Chess(startFen));
        setMoveMade({ orig: "", dest: "" });
        setFen("");
        setFen(startFen);
    }, [startFen]);

    useEffect(() => {
        const interval = setInterval(
            () => {
                if (chess.validMoves().length > 0) {
                    moveFunction();
                } else {
                    clearInterval(interval);
                    resetFen();
                }
            },
            400
        );

        return () => {
            clearInterval(interval);
            //resetFen();
        }
    }, [chess]); // good idea to depend on chess as it changes just once after setState has happened for startFen, otherwise multiple boards were coming in

    return (<>
        <AnimatedBoardInternal
            fen={fen}
            validMoves={[]}
            moveFunction={moveFunction}
            moveMade={moveMade}
        />
    </>);
};

export default AnimatedBoard;