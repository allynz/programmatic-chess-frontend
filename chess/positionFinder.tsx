import { Piece, Square, SQUARES } from "chess.js";
import checkBoard from "./boardChecker";
import { Board } from "./types";
import { getCordFromSquare, getFen } from "./utilities";

// neither king is in check and has position is not stalemate for any side
// dont render board if i/net or service not present, or see appropriate exp
export const findRandomPosition = (pieceList: Array<Piece>) => {
    return newPos(pieceList);
};

// returns new fen
// keep pieces size low so that random generation is possible easily
// TODO: make sure that draw condition is not valid here - 50 move rule
// try to improve this logic later on with matrix and pieces placement
const newPos = (pieces: Array<Piece>): string => {
    let board: Board = [...Array(8)].map(e => Array(8)); // need default val
    let isValidCombo: boolean = false;
    // have a counter also for maximum tries
    while (isValidCombo == false) {
        board = [...Array(8)].map(e => Array(8));
        const positions: Array<Square> = getRandomPositions(pieces?.length);
        positions.forEach((square, idx) => {
            const cord = getCordFromSquare(square);
            board[cord[0]][cord[1]] = pieces?.at(idx); // these kind of null checks I should avoid, should throw error if net is not there
        })
        isValidCombo = checkBoard('w', board);
    }

    return getFen(board);
}

// make sure random works correctly
const getRandomPositions = (len: number) => {
    return getMultipleRandom(SQUARES, len);
};

function getMultipleRandom(arr: Array<any>, num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random()); // make sure random is different everytime invoked

    return shuffled.slice(0, num);
}