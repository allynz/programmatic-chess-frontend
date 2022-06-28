// can also make const vars here - can we make functions here static, or does static in js even make sense?
import { Chess } from "chess.js";
import { Chessground } from "chessground";
import { Cord, Piece, Move, Color, Board, Square } from "./types";

// general Utilities //

// later on have responsive board rather than just 8X8
export function getCordFromSquare(square: Square): Cord {
    const col: number = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row: number = 7 - (square.charCodeAt(1) - '1'.charCodeAt(0));

    return [row, col];
}

export function getSquareFromCord(cord: Cord): Square | undefined {
    if (inBoundCord(cord)) {
        const row: string = String(8 - cord[0]);
        const col: string = String.fromCharCode('a'.charCodeAt(0) + cord[1]); // check if this works

        return col.concat(row) as Square;
    } else {
        return undefined;
    }
}

// if it is of type square then it will be in bound
export function inBoundSquare(square: Square): boolean {
    return true;
}

export function inBoundCord(cord: Cord): boolean {
    return cord[0] >= 0
        && cord[0] < 8
        && cord[1] >= 0
        && cord[1] < 8;
}

// Chess related utilities
export const nextTurn = (turn: Color) => {
    return turn == 'w' ? 'b' : 'w';
}

// This is the problem with functional programming - managing large states
export const boardAfterMove = (board: Board, move: Move): Board => {
    const newBoard = board;
    const
        startCord = getCordFromSquare(move.orig),
        endCord = getCordFromSquare(move.dest);
    newBoard[endCord[0]][endCord[1]] = newBoard[startCord[0]][startCord[1]];
    newBoard[startCord[0]][startCord[1]] = undefined;

    return newBoard;
};

// board should be valid
export const getFen = (board: Board): string => {
    // problem with chessGround is u need an html element to initialise, can that be bypassed? still doesnt seem right? Could have issues: https://stackoverflow.com/questions/26220243/how-to-instantiate-new-htmlelement
    const chess = new Chess();
    chess.clear();

    board.forEach((val, row) => {
        val.forEach((piece, col) => {
            if (piece === undefined) return;
            chess.put(
                // need to cast Piece as the chess.js required type
                {
                    type: piece.type,
                    color: piece.color
                },
                getSquareFromCord([row, col]) as Square);
        });
    });

    // make sure this works and in future implementation doesn't change much. Write your own fen provider if necessary
    return chess.fen().split(' ').at(0) || ""; // empty should not be returned though
};