// can also make const vars here - can we make functions here static, or does static in js even make sense?
import { Chess } from "chess.js";
import { Board, Color, Cord, Move, Piece, Square } from "./types";
import { cloneDeep } from 'lodash';

// general Utilities //

// later on have responsive board rather than just 8X8
export function getCordFromSquare(square: Readonly<Square>): Cord {
    const col: number = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row: number = 7 - (square.charCodeAt(1) - '1'.charCodeAt(0));

    return [row, col];
}

export function getSquareFromCord(cord: Readonly<Cord>): Square | undefined {
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
    return square.length === 2
        // check if this equality compares correctly
        && (square.charAt(0) >= 'a' && square.charAt(0) <= 'h')
        && (square.charAt(1) >= '1' && square.charAt(1) <= '8');
}

export function inBoundCord(cord: Readonly<Cord>): boolean {
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
export const boardAfterMove = (board: Readonly<Board>, move: Readonly<Move>): Board => {
    // remember, whenever an object modification is req, use deep clone
    const newBoard: Board = cloneDeep(board) as Board; // this seems necessary, although see if any other fix is possible or not

    const
        startCord = getCordFromSquare(move.orig),
        endCord = getCordFromSquare(move.dest);
    newBoard[endCord[0]][endCord[1]] = newBoard[startCord[0]][startCord[1]];
    newBoard[startCord[0]][startCord[1]] = undefined;

    return newBoard;
};

// board should be valid
// gets only first part of an FEN so be careful in using it
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

// does Readonly<T> effect equality?
export const getPieceSquares = (
    board: Readonly<Board>,
    color: Readonly<Color>): Readonly<Array<Cord>> => {
    const squares: Array<Cord> = [];

    board.forEach((val, row) => {
        val.forEach((piece: Piece | undefined, col) => {
            if (piece?.color === color) {
                squares.push([row, col]);
            }
        })
    });

    return squares;
}