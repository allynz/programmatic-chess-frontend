import { eq } from "../utilities/equals";
import { BoardState } from "./boardState";
import { SQUARES, Status } from "./config";
import { Board, Move, Piece, Square } from "./types";

// don't go for afncy stuff right now, just do it and then we'll optimise later. Board is small only
// structured this class to place most used function at the bottom
// right now I'm mostly using functional programming, see if OO is better here(or can be in the future)
// a lot of refactoring work may be needed
export class Chess {
    static STARTING_POSTION: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    static HISTORY_LIMIT = 300; // make sure in backend also this limit is honored

    // these are mutable vars, make sure that undo works with these and no new vars are needed. Be careful when adding new vars for this
    private boardState: BoardState;
    /**
     * History of previous boardStates (excludes current boardState)
     * Useful for undo operation
     */
    private history: Array<string>; // maybe we don't need the whole object, just enough to construct it back like just fens

    constructor(fen?: string) {
        //console.log("fen iinside chess", fen);
        this.history = []; // have a limit on history so we don't run out of memory, can also have a move limiter or undo limiter
        this.boardState = new BoardState(fen || Chess.STARTING_POSTION);
        //console.log("cconst", this.boardState.getGrid());
    }

    // default visibility is public
    getFen(): string {
        return this.boardState.getFen();
    }

    getHistory(): Array<string> {
        return this.history;
    }

    // store it in the history, update curr state - fen and boardState
    move(orig: Square, dest: Square): boolean {
        //console.log("gridFirst", this.boardState.getGrid()); // this is some async shit as on disabling below code, grid is normal
        //debugger;
        const isGameOver = this.isGameOver();
        const isMoveValid = this.boardState.isValidMove(orig, dest);
        console.log("gameOver", isGameOver);
        console.log("isMoveValid", isMoveValid);
        if (isGameOver || !isMoveValid) {
            return false;
        }

        // needs to be before boardState move as then we change the state by moving
        //console.log("fenBeforeMoving", this.boardState.getFen());
        this.history.push(this.boardState.getFen());
        if (this.history.length > Chess.HISTORY_LIMIT) this.history.shift(); // check if this is in place
        this.boardState.move(orig, dest);

        return true;
    }

    // checkmate, stalemate, be careful of king in check condition
    // store this as a variable so we don't compute it again and again
    isGameOver(): boolean {
        //debugger;
        // current turn side have valid moves possible
        const validMoves = this.validMoves();
        //console.log("gg", validMoves.length);
        //debugger;
        return validMoves.length === 0; // it should not be undefined
    }

    // return all valid moves - moves that generate a valid board, else say that not possible
    // don't call isGameOver in here otherwise it's recursive
    // return valid moves for the current turn
    // check sqaures for current turn pieces only, that way we can do it faster
    validMoves(): Array<Move> {
        //console.log("wow");
        return SQUARES
            // all valid piece moves for the current turn
            .flatMap(square => this.boardState.getValidMovesForSquare(square as Square))
            .filter(move => move && move.orig && move.dest && !eq(move.orig, move.dest))
            .filter(move => this.boardState.isValidMove(move.orig, move.dest));
    }

    // TODO: complete later
    undo() {
        //console.log("undo");
        if (this.history.length == 0) return;

        this.boardState = new BoardState(this.history.pop()!); // find better way than !
        //console.log("fenAfterUndo", this.boardState.getFen());
    }

    // if no valid move, what is the status
    // TODO: cache this, or make a variable to be updated after each move
    getStatus(): Status {
        // no pieces of opponent left - insufficient material
        // no king
        // no valid moves left - king in check or not

        if (this.validMoves().length === 0) {
            console.log("getting status");
            const pieces: Array<Piece> = this.boardState.getPieces(this.boardState.getTurn());
            if (pieces.length === 0) {
                // insufficient material
                return Status.INSUFFICIENT_MATERIAL;
            } else {
                if (pieces.find(piece => piece.type === 'k')) {
                    if (this.boardState.kingInCheck()) {
                        return Status.CHECKMATE;
                    } else {
                        return Status.STALEMATE;
                    }
                } else {
                    return Status.INSUFFICIENT_MATERIAL;
                }
            }
        } else {
            // have ability to bend the rules sometimes, like single queen can checkmate - stalemate is checkmate etc.

            // TODO: Make questions so that you need all the pieces for checkmate - mostly, not necessary though
            const canCheckMate = (): boolean => {
                // K vs a single piece, and other conditions
                const pieces: Array<Piece> = this.boardState.getPieces(this.boardState.getTurn());
                return pieces.length > 1;
            };

            // have few checks for insufficient material, but otheriwse return playing, can checkmate is more complex, need to think about it
            if (canCheckMate()) {
                return Status.PLAYING;
            } else {
                return Status.INSUFFICIENT_MATERIAL;
            }
        }
    }

    // use this to make faster random moves rather than computing all valid
    makeRandomMove() {

    }
}