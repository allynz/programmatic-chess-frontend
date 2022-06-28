import { Board, Color, Cord, Move, Piece, Square } from "./types";
import { getCordFromSquare, getSquareFromCord, inBoundCord } from "./utilities";

// need to make this a class so I can access getPiece properly and not have so many parameter passing outside
// king can walk into a check, we are just returning all next valid moves of piece, without blockage
// capturing a king should not be possible as that would itself have been a previous invalid move
// return all valid squares by piece, no check stuff, that will be seen in isMoveValid
export default function getValidMovesForSquare(
    board: Array<Array<Piece | undefined>>,
    startSquare: Square): Array<Move> {
    // Is type anyways inferred in TS, or do i always have to specify type for safety? Better to specify only though as we will be passing current var to other places etc, and while reading from github, reader cannot infer automatically
    const startCord: Cord = getCordFromSquare(startSquare);

    // we can move this outside, but I dont know if that will be pass-by-value or ref
    // good name would be just piece, just shift it outside, we can pass board but try to not pass it
    const getPiece = (cord: Cord): Piece | undefined => {
        // make sure that
        return board[cord[0]][cord[1]];
    };
    const piece: Piece | undefined = board[0][0];

    if (piece === undefined) {
        return [];
    }

    let res: Array<Square> = [];
    const movement = new Movement(board, startCord);
    if (piece.type == 'k') {
        // in_check does not matter, only find moves with no blocking
        res = movement.kingMovement();
    } else if (piece.type == 'q') {
        res = movement.queenMovement();
    } else if (piece.type == 'b') {
        res = movement.bishopMovement();
    } else if (piece.type == 'r') {
        res = movement.rookMovement();
    } else if (piece.type == 'n') {
        res = movement.knightMovement();
    } else if (piece.type == 'p') {
        res = movement.pawnMovement();
    }

    return res.map(square => { return { orig: startSquare, dest: square } as Move });
}

// probably just functions would be better: https://stackoverflow.com/questions/16157839/typescript-this-inside-a-class-method (const vars captures this - what does it mean?)
// https://stackoverflow.com/questions/56055658/what-is-the-difference-between-class-method-vs-class-field-function-vs-class-f
// try something like return {kingMovement: ()=>{}, bmovement: ()=>{}} like in chess.js types
class Movement {
    private board: Board;
    private startCord: Cord;

    constructor(board: Board, startCord: Cord) {
        this.board = board;
        this.startCord = startCord;
    }

    // no checks on cord for now
    piece = (cord: Cord): Piece | undefined => {
        return this.board[cord[0]][cord[1]];
    }

    kingMovement = (): Array<Square> => {
        const cords: Array<Cord> = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const cord: Cord = [this.startCord[0] + i, this.startCord[1] + j];
                if (cord === this.startCord
                    || !inBoundCord(cord)
                    || (this.piece(cord)
                        && this.piece(cord)?.color !== this.piece(this.startCord)?.color)) {
                    continue;
                }

                cords.push(cord);
            }
        }

        return cords
            .map(cord => getSquareFromCord(cord) as Square);
    };
    rookMovement = (): Array<Square> => {
        const dirs: Array<Cord> = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ];

        const cords: Array<Cord> = [];
        for (const dir of dirs) {
            for (let
                cord: Cord = [
                    this.startCord[0] + dir[0],
                    this.startCord[1] + dir[1]
                ];
                inBoundCord(cord);
                cord[0] += dir[0], cord[1] += dir[1]) {
                if (this.piece(cord) === undefined) {
                    cords.push(cord);
                } else {
                    if (this.piece(cord)?.color === this.piece(this.startCord)?.color) {
                        break;
                    } else {
                        cords.push(cord);
                        break;
                    }
                }
            }
        }

        return cords
            .map(cord => getSquareFromCord(cord) as Square);
    };
    bishopMovement = (): Array<Square> => {
        const dirs: Array<Cord> = [
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1]
        ];

        const cords: Array<Cord> = [];
        for (const dir of dirs) {
            for (let
                cord: Cord = [
                    this.startCord[0] + dir[0],
                    this.startCord[1] + dir[1]
                ];
                inBoundCord(cord);
                cord[0] += dir[0], cord[1] += dir[1]) {
                if (this.piece(cord) === undefined) {
                    cords.push(cord);
                } else {
                    if (this.piece(cord)?.color === this.piece(this.startCord)?.color) {
                        break;
                    } else {
                        cords.push(cord);
                        break;
                    }
                }
            }
        }

        return cords
            .map(cord => getSquareFromCord(cord) as Square);
    };
    // see if we need to place it above the others as it is a const var, not a function
    queenMovement = (): Array<Square> => {
        return this.rookMovement().concat(this.bishopMovement());
    };
    knightMovement = (): Array<Square> => {
        const dirs = [
            [-1, 2],
            [-2, 1],
            [2, 1],
            [1, 2],
            [-1, -2],
            [-2, -1],
            [2, -1],
            [1, -2]
        ];

        const cords: Array<Cord> = [];
        for (const dir of dirs) {
            const cord: Cord = [this.startCord[0] + dir[0], this.startCord[1] + dir[1]];
            if (inBoundCord(cord)) {
                // use getPiece here when we shift this to a class
                if (this.board[cord[0]][cord[1]] === undefined
                    || this.board[cord[0]][cord[1]]?.color != this.board[this.startCord[0]][this.startCord[1]]?.color)
                    cords.push(cord);
            }
        }

        // if this is common across all, then do it later
        return cords
            .map(cord => getSquareFromCord(cord) as Square); // cords are valid so Square will be valid too
    };
    pawnMovement = (): Array<Square> => {
        const piece: Piece = this.piece(this.startCord)!;
        const diff = piece.color == 'w' ? -1 : 1;

        const forward: Cord = [this.startCord[0] + diff, this.startCord[1]];
        const forwardLeft: Cord = [this.startCord[0] + diff, this.startCord[1] - 1];
        const forwardRight: Cord = [this.startCord[0] + diff, this.startCord[1] + 1];

        const cords: Array<Cord> = [];
        if (inBoundCord(forward) && this.piece(forward) === undefined) {
            cords.push(forward);
        }
        if (inBoundCord(forwardLeft)
            && this.piece(forwardLeft)
            && this.piece(forwardLeft)!.color != piece.color) {
            cords.push(forwardLeft);
        }
        if (inBoundCord(forwardRight)
            && this.piece(forwardRight)
            && this.piece(forwardRight)!.color != piece.color) {
            cords.push(forwardRight);
        }

        return cords
            .map(cord => getSquareFromCord(cord) as Square);
    };
}

