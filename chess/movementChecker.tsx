import { Board, Cord, Piece } from "./types";

// without any piece checks, just check movement
// piece needs to be present at the start cord, later refactor if function is crashing with stateless methodology - we can't keep checking everywhere
// checks whether the required moves can be made in one move
// the position on the board right now should be a valid one
// remember all the checks so we dont check again - cords are in bound, startPiece is present
// should we have multiple returns? We can
const isValidMovement = (
    board: Board, startCord: Cord, endCord: Cord): boolean => {
    const piece: Piece = board[startCord[0]][startCord[1]]!; // piece will be present but it isn't guaranteed in stateless
    const endPiece: Piece | undefined = board[endCord[0]][endCord[1]];

    // cannot capture same piece
    // ?. will short circuit to undefined: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining, test it though once 
    if (endPiece?.color === piece.color) return false;

    // we just need to check if there is a path from [startCord, endCord)
    if (piece.type === 'k') {
        return kingMovement(board, startCord, endCord);
    } else if (piece.type == 'q') {
        return queenMovement(board, startCord, endCord);
    } else if (piece.type == 'r') {
        return rookMovement(board, startCord, endCord);
    } else if (piece.type == 'n') {
        return knightMovement(board, startCord, endCord);
    } else if (piece.type == 'b') {
        return bishopMovement(board, startCord, endCord);
    } else if (piece.type == 'p') {
        return pawnMovement(board, startCord, endCord);
    }

    return false;
}

export default isValidMovement;

// maybe we can refactor these movements by returning a function which returns a function
const kingMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
    const xDist: number = Math.abs(startCord[0] - endCord[0]);
    const yDist: number = Math.abs(startCord[1] - endCord[1]);

    // has to be one move dist from startCord - dont use comments like these, make another function with good name
    return xDist <= 1 && yDist <= 1;
};
const rookMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
    // convert to one block rather than 2 if blocks
    if (endCord[0] == startCord[0]) {
        const diff = (startCord[1] < endCord[1] ? 1 : -1);
        for (let i = startCord[1] + diff;
            i != endCord[1];
            i += diff) {
            // dont have these kind of early returns, take out in a function and compute it
            if (board[startCord[0]][i] !== undefined) {
                return false;
            }
        }

        return true;
    } else if (endCord[1] == startCord[1]) {
        const diff = (startCord[0] < endCord[0] ? 1 : -1);
        for (let i = startCord[0] + diff;
            i != endCord[0];
            i += diff) {
            // dont have these kind of early returns, take out in a function and compute it
            if (board[i][startCord[0]] !== undefined) {
                return false;
            }
        }

        return true;
    } else {
        return false; // seems we can return false at the end adn just check for returning true
    }

};
const bishopMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
    const
        startSum = startCord[0] + startCord[1],
        endSum = endCord[0] + endCord[1];
    const
        startDiff = startCord[0] - startCord[1],
        endDiff = endCord[0] - endCord[1];

    if (startSum === endSum) {
        const diff = (startCord[0] < endCord[0] ? 1 : -1);

        // improve these kind of loops, they are hard to read
        for (let
            cord = [startCord[0] - diff, startCord[1] + diff];
            cord !== endCord;
            cord[0] -= diff, cord[1] += diff) {
            if (board[cord[0]][cord[1]] !== undefined) {
                return false;
            }
        }

        return true;
    } else if (startDiff === endDiff) {
        const diff = (startCord[0] < endCord[0] ? 1 : -1);

        for (let
            cord = [startCord[0] + diff, startCord[1] + diff];
            cord !== endCord;
            cord[0] += diff, cord[1] += diff) {
            if (board[cord[0]][cord[1]] !== undefined) {
                return false;
            }
        }

        return true;
    }

    return false;
};
// see if we need to place it above the others as it is a const var, not a function
const queenMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
    return rookMovement(board, startCord, endCord)
        || bishopMovement(board, startCord, endCord);
};
const knightMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
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
        if (endCord == [startCord[0] + dir[0], startCord[1] + dir[1]]) {
            return true;
        }
    }

    return false;
};
const pawnMovement = (board: Board, startCord: Cord, endCord: Cord): boolean => {
    const piece: Piece = board[startCord[0]][startCord[1]]!;
    const endPiece: Piece | undefined = board[endCord[0]][endCord[1]];

    // combine both if blocks as one - forward, forwardLeft..., use diff=+/-1 as a variable
    if (piece.color == 'w') {
        const up: Cord = [startCord[0] - 1, startCord[1]];
        const upLeft: Cord = [startCord[0] - 1, startCord[1] - 1];
        const upRight: Cord = [startCord[0] - 1, startCord[1] + 1];

        if (endCord === up) {
            return endPiece === undefined;
        } else if (endCord === upLeft || endCord === upRight) {
            return endPiece !== undefined;
        }
    } else {
        const down: Cord = [startCord[0] + 1, startCord[1]];
        const downLeft: Cord = [startCord[0] + 1, startCord[1] - 1];
        const downRight: Cord = [startCord[0] + 1, startCord[1] + 1];

        if (endCord === down) {
            return endPiece === undefined;
        } else if (endCord === downLeft || endCord === downRight) {
            return endPiece !== undefined;
        }
    }

    return false;
};

const ff = (a: number): { bro: () => boolean, bro2: () => {}, abc: Function } => {
    return {
        bro: (): boolean => {
            const b = a + 1;
            return true;
        },

        bro2: () => {
            return a + 10;
        },

        abc: function gg(a: string) {
            return 5;
        }
    }
}