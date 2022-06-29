import { Chess } from "chess.js"; // see this implementation of class and see if you can learn anything from it
import checkBoard from "./boardChecker";
import isValidMovement from "./movementChecker";
import { Board, Color, Cord, Move, Piece, Square } from "./types";
import { boardAfterMove, getCordFromSquare, getFen, inBoundSquare, nextTurn } from "./utilities";
import getValidMovesForSquare from "./validMoveProvider";

// Use === not ==

// is this class public, make it accessible only in this file
export class BoardState {
    private turn: Color;
    private orientation; // needed for pawn moves, or just use default one. Preferably don't use pawns in your game a checking if it is valid is a mess
    private fen: string;
    private grid: Board;

    constructor(fen: string) {
        this.fen = fen;
        this.grid = [...Array(8)].map(e => Array(8));

        // https://www.chess.com/terms/fen-chess
        const currFen = fen + ' w ' + ' - ' + ' - ' + ' 0 1';

        const testChess = new Chess(currFen); // needs the complete fen, so we need to do some hacks
        //console.log("validateFen", testChess.validate_fen(currFen));
        //console.log("chess.js board: ", testChess.fen());
        testChess.board().forEach((val, row) => {
            val.forEach((pieceDetails, col) => {
                if (pieceDetails === null) {
                    this.grid[row][col] = undefined;
                } else {
                    const { type, color, square } = pieceDetails!;
                    this.grid[row][col] = { type: type, color: color }
                }
            })
        });
        //console.log("constructor", this.grid);
        this.orientation = true;
        this.turn = 'w';
    }

    // update all board vars
    updateBoard(turn?: Color, fen?: string, grid?: Board) {

    }

    getGrid(): Board {
        return this.grid;
    }

    getFen(): string {
        return this.fen;
    }

    pieceFromSquare(square: Square): Piece | undefined {
        const cord = getCordFromSquare(square);
        return this.pieceFromCord(cord);
    }

    pieceFromCord(cord: Cord): Piece | undefined {
        return this.grid[cord[0]][cord[1]];
    }

    getTurn(): Color {
        return this.turn;
    }

    // check here if board is valid after making the move
    // cannot capture a king in current turn but that shouldn't be possible anyway if current board is valid
    isValidMove(
        orig: Square,
        dest: Square,
        // ordering matters in param, so better make it a map?
        shouldCheckValidity?: boolean): boolean {
        //console.log("gridinsideisvlaid", this.grid);

        // check types and casting
        if (!inBoundSquare(orig)
            || !inBoundSquare(dest)
            || orig === dest) {
            return false;
        }

        const startCord: Cord = getCordFromSquare(orig);
        const endCord: Cord = getCordFromSquare(dest);

        // check if turn == current piece color and a piece exists at orig and piece has valid movement to dest
        if (true) {
            const piece: Piece | undefined = this.grid[startCord[0]][startCord[1]];
            if (!piece
                || piece.color !== this.turn
                || !isValidMovement(this.grid, startCord, endCord)) {
                return false;
            }
        }

        const isBoardValid = checkBoard(
            nextTurn(this.turn),
            boardAfterMove(this.grid, { orig, dest })); // TODO: should we update turn here

        return isBoardValid;
    }

    // move without validation, no promotion or castling, etc.
    // if anything goes wrong, error will be thrown
    move(orig: Square, dest: Square): void {
        //debugger;
        // order of assignment is important
        //console.log("den before movement:", this.grid);
        this.grid = boardAfterMove(this.grid, { orig, dest });
        this.fen = getFen(this.grid);
        //console.log("den after movement:", this.grid);
        this.turn = nextTurn(this.turn);
    }

    // should we just return only the real valid moves from here?
    getValidMovesForSquare(square: Square): Array<Move> {
        //console.log("gridinsidevalidmoves", this.grid);
        const moves = getValidMovesForSquare(this.grid, square);
        const cord = getCordFromSquare(square);
        //console.log("valid piece in chess", this.grid[cord[0]][cord[1]]);
        //console.log("valid moves in chess", moves);
        return moves;
    }

    getPieces(color: Color) {
        // try to use flatMap here
        const res: Array<Piece> = [];

        this.grid.forEach((val, row) => {
            val.forEach((val, col) => {
                const piece = this.pieceFromCord([row, col]);
                if (piece && piece.color === color) {
                    res.push(piece);
                }
            })
        });

        return res;
    }

    // king should be present for this turn
    kingInCheck() {
        // wow, what an algo
        return checkBoard(nextTurn(this.turn), this.grid) == false;
    }
};