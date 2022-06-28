import checkBoard from "./boardChecker";
import isValidMovement from "./movementChecker";
import { Color, Cord, Move, Piece, Square } from "./types";
import { boardAfterMove, getCordFromSquare, getFen, inBoundSquare, nextTurn } from "./utilities";
import getValidMovesForSquare from "./validMoveProvider";

// Use === not ==

// is this class public, make it accessible only in this file
export class BoardState {
    private turn: Color;
    private orientation; // needed for pawn moves, or just use default one
    private fen: string;
    private grid: Array<Array<Piece | undefined>>;

    constructor(fen: string) {
        this.fen = fen;
        this.grid = [[]];
        this.orientation = true;
        this.turn = 'w';
    }

    getFen(): string {
        return this.fen;
    }

    getPiece(square: Square): Piece | undefined {
        const cord = getCordFromSquare(square);
        return this.grid[cord[0]][cord[1]];
    }

    // check here if board is valid after making the move
    // cannot capture a king in current turn but that shouldn't be possible anyway if current board is valid
    isValidMove(
        orig: Square,
        dest: Square,
        // ordering matters in param, so better make it a map?
        shouldCheckValidity?: boolean): boolean {

        // check types and casting
        if (!inBoundSquare(orig)
            || !inBoundSquare(dest)
            || orig === dest) {
            return false;
        }

        const startCord: Cord = getCordFromSquare(orig);
        const endCord: Cord = getCordFromSquare(dest);

        // check if turn == current piece color and a piece exists at orig and piece has valid movement to dest
        if (shouldCheckValidity) {
            const piece: Piece | undefined = this.grid[startCord[0]][startCord[1]];
            if (!piece
                || piece.color != this.turn
                || !isValidMovement(this.grid, startCord, endCord)) {
                return false;
            }
        }

        return checkBoard(
            nextTurn(this.turn),
            boardAfterMove(this.grid, { orig, dest })); // TODO: should we update turn here
    }

    // move without validation, no promotion or castling, etc.
    // if anything goes wrong, error will be thrown
    move(orig: Square, dest: Square): void {
        // order of assignment is important
        this.grid = boardAfterMove(this.grid, { orig, dest });
        this.fen = getFen(this.grid);
        this.turn = nextTurn(this.turn);
    }

    // should we just return only the real valid moves from here?
    getValidMovesForSquare(square: Square): Array<Move> {
        return getValidMovesForSquare(this.grid, square);
    }
};