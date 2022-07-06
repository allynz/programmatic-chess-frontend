import { eq } from "../utilities/equals";
import { Board, Cord, Piece } from "./types";

// without any piece checks, just check movement
// piece needs to be present at the start cord, later refactor if function is crashing with stateless methodology - we can't keep checking everywhere
// checks whether the required moves can be made in one move
// the position on the board right now should be a valid one
// remember all the checks so we dont check again - cords are in bound, startPiece is present
// should we have multiple returns? We can
const isRawValidMovement = (
    board: Readonly<Board>,
    startCord: Readonly<Cord>,
    endCord: Readonly<Cord>): boolean => {
    const piece: Piece = board[startCord[0]][startCord[1]]!; // piece will be present but it isn't guaranteed in stateless
    const endPiece: Piece | undefined = board[endCord[0]][endCord[1]];

    // cannot capture same piece
    // ?. will short circuit to undefined: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining, test it though once 
    if (endPiece?.color === piece.color) return false;

    const movement = movementProvider(board, startCord, endCord);

    // we just need to check if there is a path from [startCord, endCord)
    let isMovementValid: boolean = false;
    if (piece.type === 'k') {
        isMovementValid = movement.kingMovement();
    } else if (piece.type == 'q') {
        isMovementValid = movement.queenMovement();
    } else if (piece.type == 'r') {
        isMovementValid = movement.rookMovement();
    } else if (piece.type == 'n') {
        isMovementValid = movement.knightMovement();
    } else if (piece.type == 'b') {
        isMovementValid = movement.bishopMovement();
    } else if (piece.type == 'p') {
        isMovementValid = movement.pawnMovement();
    }

    return isMovementValid;
}

export default isRawValidMovement;

// also can just return the required piece movement from here
const movementProvider = (board: Readonly<Board>, startCord: Readonly<Cord>, endCord: Readonly<Cord>) => {
    // not checking if cord is in bound, although can return null if that's the case
    const piece = (cord: Cord): Piece | undefined => {
        return board[cord[0]][cord[1]];
    }

    const kingMovement = () => {
        const xDist: number = Math.abs(startCord[0] - endCord[0]);
        const yDist: number = Math.abs(startCord[1] - endCord[1]);

        // has to be one move dist from startCord - dont use comments like these, make another function with good name
        return xDist <= 1 && yDist <= 1;
    };
    const rookMovement = () => {
        // convert to one block rather than 2 if blocks
        if (endCord[0] === startCord[0]) {
            const diff = (startCord[1] < endCord[1] ? 1 : -1);
            for (let
                i = startCord[1] + diff;
                i !== endCord[1];
                i += diff) {
                // dont have these kind of early returns, take out in a function and compute it
                if (!eq(board[startCord[0]][i], undefined)) {
                    return false;
                }
            }

            return true;
        } else if (endCord[1] === startCord[1]) {
            const diff = (startCord[0] < endCord[0] ? 1 : -1);
            for (let
                i = startCord[0] + diff;
                i !== endCord[0];
                i += diff) {
                // dont have these kind of early returns, take out in a function and compute it
                if (!eq(board[i][startCord[1]], undefined)) {
                    return false;
                }
            }

            return true;
        } else {
            return false; // seems we can return false at the end adn just check for returning true
        }
    };
    const bishopMovement = () => {
        const
            startSum: number = startCord[0] + startCord[1],
            endSum: number = endCord[0] + endCord[1];
        const
            startDiff: number = startCord[0] - startCord[1],
            endDiff: number = endCord[0] - endCord[1];

        if (startSum === endSum) {
            const diff = (startCord[0] < endCord[0] ? 1 : -1);

            // improve these kind of loops, they are hard to read
            for (let
                cord: Cord = [startCord[0] - diff, startCord[1] + diff];
                !eq(cord, endCord);
                cord[0] -= diff, cord[1] += diff) {

                if (piece(cord) !== undefined) {
                    return false;
                }
            }

            return true;
        } else if (startDiff === endDiff) {
            const diff = (startCord[0] < endCord[0] ? 1 : -1);

            for (let
                cord: Cord = [startCord[0] + diff, startCord[1] + diff];
                !eq(cord, endCord);
                cord[0] += diff, cord[1] += diff) {

                if (piece(cord) !== undefined) {
                    return false;
                }
            }

            return true;
        }

        return false;
    };
    const queenMovement = (): boolean => {
        return rookMovement() || bishopMovement();
    };
    const knightMovement = (): boolean => {
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

        for (const dir of dirs) {
            const cord: Cord = [startCord[0] + dir[0], startCord[1] + dir[1]];
            if (eq(endCord, cord)) {
                return true;
            }
        }

        return false;
    };
    const pawnMovement = (): boolean => {
        const piece: Piece = board[startCord[0]][startCord[1]]!;
        const endPiece: Piece | undefined = board[endCord[0]][endCord[1]];

        const rowDirection = piece.color == 'w' ? -1 : 1;
        const forwardRow = [startCord[0] + rowDirection];

        const forward = [forwardRow, startCord[1]];
        const forwardLeft = [forwardRow, startCord[1] - 1];
        const forwardRight = [forwardRow, startCord[1] + 1];
        if (eq(endCord, forward)) {
            return endPiece === undefined;
        } else if (eq(endCord, forwardLeft) || eq(endCord, forwardRight)) {
            return endPiece !== undefined;
        }

        return false;
    };

    return {
        kingMovement: kingMovement,
        rookMovement: rookMovement,
        bishopMovement: bishopMovement,
        queenMovement: queenMovement,
        knightMovement: knightMovement,
        pawnMovement: pawnMovement
    }
}