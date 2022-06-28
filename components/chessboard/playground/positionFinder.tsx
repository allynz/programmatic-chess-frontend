import { Chess, Piece, Square, SQUARES } from "chess.js";
import 'react-chessground/dist/styles/chessground.css';

// neither king is in check and has position is not stalemate for any side
export const findRandomPosition = (pieceList: Array<Piece>) => {
    return newPos(pieceList);
};

const getRandomSquare = () => {

};

// returns new fen
// keep pieces size low so that random generation is possible easily
// TODO: make sure that draw condition is not valid here - 50 move rule
// try to improve this logic later on with matrix and pieces placement
const newPos = (pieces: Array<Piece>): string => {
    const chess = new Chess();

    // see if both rooks dont give check at the same time condition works here or not
    // also see if both kings are not needed condition
    let isValidCombo = false;

    // have a counter also for maximum tries
    while (isValidCombo == false) {
        chess.clear();
        const positions: Array<Square> = getRandomPositions(pieces.length);
        isValidCombo =
            pieces
                .map((piece, idx) => chess.put(piece, positions.at(idx) as Square))
                .every(val => val == true)
            && chess.validate_fen(chess.fen()).valid;
    }

    return chess.fen();
}

// make sure random works correctly
const getRandomPositions = (len: number) => {
    return getMultipleRandom(SQUARES, len);
};

function getMultipleRandom(arr: Array<any>, num: number) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
}