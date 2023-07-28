import { Chess } from "chess.js"; // see this implementation of class and see if you can learn anything from it
import { eq } from "../utilities/equals";
import checkBoard from "./boardChecker";
import isRawValidMovement from "./movementChecker";
import { Board, Color, Cord, Move, Piece, Square } from "./types";
import { boardAfterMove, getCordFromSquare, getFen, inBoundSquare, nextTurn } from "./utilities";
import getRawValidMovesForSquare from "./validMoveProvider";

// Use === not ==

// is this class public, make it accessible only in this file
export class BoardState {
    // for orientation, use up for white, and down for black
    private turn: Color;
    private fen: string;
    private grid: Board;
    private kingInCheck: boolean;

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
        this.turn = 'w';
        this.kingInCheck = this.computeKingInCheck();
    }

    // update all board vars
    updateBoard(grid: Readonly<Board>) {
        this.turn = nextTurn(this.turn);
        this.grid = grid as Board;
        this.fen = getFen(this.grid);
        this.kingInCheck = this.computeKingInCheck();
    }

    getGrid(): Board {
        return this.grid;
    }

    getFen(): string {
        return this.fen;
    }

    pieceFromSquare(square: Readonly<Square>): Piece | undefined {
        const cord = getCordFromSquare(square);
        return this.pieceFromCord(cord);
    }

    pieceFromCord(cord: Readonly<Cord>): Piece | undefined {
        return this.grid[cord[0]][cord[1]];
    }

    getTurn(): Color {
        return this.turn;
    }

    isKingInCheck(): boolean {
        return this.kingInCheck;
    }

    // check here if board is valid after making the move
    // cannot capture a king in current turn but that shouldn't be possible anyway if current board is valid
    isValidMove(orig: Readonly<Square>, dest: Readonly<Square>): boolean {
        //console.log("gridinsideisvlaid", this.grid);

        // check types and casting
        if (!inBoundSquare(orig)
            || !inBoundSquare(dest)
            || eq(orig, dest)) {
            return false;
        }

        const startCord: Cord = getCordFromSquare(orig);
        const endCord: Cord = getCordFromSquare(dest);

        // check if turn == current piece color and a piece exists at orig and piece has valid movement to dest
        const piece: Piece | undefined = this.pieceFromCord(startCord);
        if (!piece
            || piece.color !== this.turn
            || !isRawValidMovement(this.grid, startCord, endCord)) {
            return false;
        }

        // have to check regardless of check, as other pieces movement can also cause check, even if not in check right now
        const isBoardValid =
            checkBoard(
                nextTurn(this.turn),
                boardAfterMove(this.grid, { orig, dest }));

        return isBoardValid;
    }

    // move without validation, no promotion or castling, etc.
    // if anything goes wrong, error will be thrown
    move(orig: Readonly<Square>, dest: Readonly<Square>): void {
        //debugger;
        // order of assignment is important
        //console.log("den before movement:", this.grid);
        const board: Board = boardAfterMove(this.grid, { orig, dest });
        //console.log("grid after movement:", this.grid);

        this.updateBoard(board);
    }

    // should we just return only the real valid moves from here?
    getRawValidMovesForSquare(square: Square): Array<Move> {
        //console.log("gridinsidevalidmoves", this.grid);
        const moves = getRawValidMovesForSquare(this.grid, square);
        //const cord = getCordFromSquare(square);
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
    computeKingInCheck() {
        // wow, what an algo
        // LATER: prob not correct, as I need to do raw check, should not check if move is valid or not
        return checkBoard(nextTurn(this.turn), this.grid) === false;
    }
};