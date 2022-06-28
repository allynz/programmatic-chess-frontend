import { BoardState } from "./boardState";
import { SQUARES } from "./config";
import { Move, Square } from "./types";

// don't go for afncy stuff right now, just do it and then we'll optimise later. Board is small only
// structured this class to place most used function at the bottom
// right now I'm mostly using functional programming, see if OO is better here(or can be in the future)
// a lot of refactoring work may be needed
export class Chess {
    static STARTING_POSTION: string = "";
    static HISTORY_LIMIT = 300; // make sure in backend also this limit is honored

    // these are mutable vars, make sure that undo works with these and no new vars are needed. Be careful when adding new vars for this
    private boardState: BoardState;
    /**
     * History of previous boardStates (excludes current boardState)
     * Useful for undo operation
     */
    private history: Array<BoardState>; // maybe we don't need the whole object, just enough to construct it back like just fens

    constructor(fen?: string) {
        this.history = []; // have a limit on history so we don't run out of memory, can also have a move limiter or undo limiter
        this.boardState = new BoardState(fen || Chess.STARTING_POSTION);
    }

    // default visibility is public
    getFen(): string {
        return this.boardState.getFen();
    }

    getHistory(): Array<BoardState> {
        return this.history;
    }

    // store it in the history, update curr state - fen and boardState
    move(orig: Square, dest: Square): boolean {
        if (this.isGameOver() || !this.boardState.isValidMove(orig, dest)) {
            return false;
        }

        // needs to be before boardState move as then we change the state by moving
        this.history.push(this.boardState);
        if (this.history.length > Chess.HISTORY_LIMIT) this.history.shift();
        this.boardState.move(orig, dest);

        return true;
    }

    // checkmate, stalemate, be careful of king in check condition
    isGameOver(): boolean {
        // current turn side have valid moves possible
        return this.validMoves().length > 0; // it should not be undefined
    }

    // return all valid moves - moves that generate a valid board, else say that not possible
    // don't call isGameOver in here otherwise it's recursive
    // return valid moves for the current turn
    validMoves(): Array<Move> {
        return SQUARES
            // all valid piece moves for the current turn
            .flatMap(square => this.boardState.getValidMovesForSquare(square as Square))
            .filter(move => this.boardState.isValidMove(move.orig, move.dest));
    }

    // TODO: complete later
    private undo() {
        if (this.history.length == 0) return;

        this.boardState = this.history.pop()!; // find better way than !
    }
}