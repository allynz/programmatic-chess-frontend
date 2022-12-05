import { eq } from "../utilities/equals";
import { Board, Cord, Move, Piece, Square } from "./types";
import { getCordFromSquare, getSquareFromCord, inBoundCord } from "./utilities";

// need to make this a class so I can access getPiece properly and not have so many parameter passing outside
// king can walk into a check, we are just returning all next valid moves of piece, without blockage
// capturing a king should not be possible as that would itself have been a previous invalid move
// return all valid squares by piece, no check stuff, that will be seen in isMoveValid
export default function getRawValidMovesForSquare(
    board: Readonly<Board>,
    startSquare: Readonly<Square>): Array<Move> {
    // Is type anyways inferred in TS, or do i always have to specify type for safety? Better to specify only though as we will be passing current var to other places etc, and while reading from github, reader cannot infer automatically
    const startCord: Cord = getCordFromSquare(startSquare);

    // we can move this outside, but I dont know if that will be pass-by-value or ref
    // good name would be just piece, just shift it outside, we can pass board but try to not pass it
    const getPiece = (cord: Cord): Piece | undefined => {
        // make sure that
        return board[cord[0]][cord[1]];
    };
    const piece: Piece | undefined = getPiece(startCord);

    if (piece === undefined) {
        return [];
    }

    let res: Array<Square> = [];
    const movement = movementProvider(board);
    // cannot find a good way to remove startCord duplicacy, as OO is terrible in js, and calling function multiple times is gonna declare all vars and methods again
    if (piece.type == 'k') {
        res = movement.kingMovement(startCord);
    } else if (piece.type == 'q') {
        res = movement.queenMovement(startCord);
    } else if (piece.type == 'b') {
        res = movement.bishopMovement(startCord);
    } else if (piece.type == 'r') {
        res = movement.rookMovement(startCord);
    } else if (piece.type == 'n') {
        res = movement.knightMovement(startCord);
    } else if (piece.type == 'p') {
        res = movement.pawnMovement(startCord);
    }

    return res.map(square => { return { orig: startSquare, dest: square } as Move });
}

// https://stackoverflow.com/questions/56055658/what-is-the-difference-between-class-method-vs-class-field-function-vs-class-f
// iterate only on the diffs, not on actual cord, that way we don't have to clone it
// remove ? checks here, it looks ugly
// cannot provide undefined param, as it will see it as undefined and use undefined val
// make sure board is not being modified
// !!!TODO: if king is in check, you have to check board no matter what
const movementProvider = (
    board: Readonly<Board>) => {
    const piece = (cord: Readonly<Cord>): Piece | undefined => {
        return board[cord[0]][cord[1]];
    }

    // in the case of king, it's always true
    const filterAndTransform = (cords: Readonly<Array<Cord>>) => {
        return cords
            .map(cord => getSquareFromCord(cord) as Square);
    };

    // use attackGrid here to filter in_check sqaures
    // matrix O() is better than ch ecking with all pieces
    // best to check the board after move as that is the best way, piece could be protected etc. so attackgrid may not fully reveal thing
    const kingMovement = (startCord: Readonly<Cord>): Array<Square> => {
        const cords: Array<Cord> = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const cord: Cord =
                    [startCord[0] + i, startCord[1] + j];
                if (eq(cord, startCord)
                    || !inBoundCord(cord)
                    || (piece(cord)
                        &&
                        eq(piece(cord)?.color,
                            piece(startCord)?.color))) {
                    continue;
                }

                // TODO: Do we need to check board here
                cords.push(cord);
            }
        }

        // always check validity for king
        return filterAndTransform(cords);
    };
    const rookMovement = (startCord: Readonly<Cord>): Array<Square> => {
        const dirs: Array<Cord> = [
            [0, 1],
            [1, 0],
            [-1, 0],
            [0, -1]
        ];

        const cords: Array<Cord> = [];
        for (const dir of dirs) {
            // need to clone cord before pushing
            for (let i = 1; ; i++) {
                const cord: Cord = [startCord[0] + i * dir[0], startCord[1] + i * dir[1]];
                if (!inBoundCord(cord)) break;

                if (piece(cord) === undefined) {
                    cords.push(cord);
                } else {
                    if (eq(piece(cord)?.color, piece(startCord)?.color)) {
                        break;
                    } else {
                        cords.push(cord);
                        break;
                    }
                }
            }
        }

        return filterAndTransform(cords);
    };
    const bishopMovement = (startCord: Readonly<Cord>): Array<Square> => {
        const dirs: Array<Cord> = [
            [1, -1],
            [-1, 1],
            [1, 1],
            [-1, -1]
        ];

        const cords: Array<Cord> = [];
        for (const dir of dirs) {
            for (let i = 1; ; i++) {
                const cord: Cord = [startCord[0] + i * dir[0], startCord[1] + i * dir[1]];
                if (!inBoundCord(cord)) break;

                if (piece(cord) === undefined) {
                    cords.push(cord);
                } else {
                    if (piece(cord)?.color === piece(startCord)?.color) {
                        break;
                    } else {
                        cords.push(cord);
                        break;
                    }
                }
            }
        }

        return filterAndTransform(cords);
    };
    // see if we need to place it above the others as it is a const var, not a function
    const queenMovement = (startCord: Readonly<Cord>): Array<Square> => {
        return rookMovement(startCord).concat(bishopMovement(startCord));
    };
    const knightMovement = (startCord: Readonly<Cord>): Array<Square> => {
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
            const cord: Cord = [startCord[0] + dir[0], startCord[1] + dir[1]];
            if (inBoundCord(cord)) {
                // use getPiece here when we shift this to a class
                if (piece(cord) === undefined
                    || !eq(piece(cord)?.color, piece(startCord)?.color))
                    cords.push(cord);
            }
        }

        return filterAndTransform(cords);
    };
    const pawnMovement = (startCord: Readonly<Cord>): Array<Square> => {
        const diff = piece(startCord)!.color == 'w' ? -1 : 1;

        const forward: Cord = [startCord[0] + diff, startCord[1]];
        const forwardLeft: Cord = [startCord[0] + diff, startCord[1] - 1];
        const forwardRight: Cord = [startCord[0] + diff, startCord[1] + 1];

        const cords: Array<Cord> = [];
        if (inBoundCord(forward) && piece(forward) === undefined) {
            cords.push(forward);
        }
        if (inBoundCord(forwardLeft)
            && piece(forwardLeft)
            && !eq(piece(forwardLeft)!.color, piece(startCord)!.color)) {
            cords.push(forwardLeft);
        }
        if (inBoundCord(forwardRight)
            && piece(forwardRight)
            && !eq(piece(forwardRight)!.color, piece(startCord)!.color)) {
            cords.push(forwardRight);
        }

        return filterAndTransform(cords);;
    };

    return {
        kingMovement: kingMovement,
        rookMovement: rookMovement,
        bishopMovement: bishopMovement,
        queenMovement: queenMovement,
        knightMovement: knightMovement,
        pawnMovement: pawnMovement
    };
}

