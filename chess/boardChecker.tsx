import { SQUARES } from "./config";
import isValidMovement from "./movementChecker";
import { Board, Color, Cord, Piece, Square } from "./types";
import { getCordFromSquare, nextTurn } from "./utilities";

// Hmmm, should we use Object oriented instead? How does the boardState object access it
// current turns king is not in check
// board should be slightly valid, only one piece per square
// opponent king can't be in check during my turn
function checkBoard(
    turn: Color,
    board: Array<Array<Piece | undefined>>): boolean {

    // remove if condition and turn into one block
    // check for undefined before converting
    const kingSquare: Square | undefined =
        SQUARES
            .find(square => {
                const cord: Cord = getCordFromSquare(square);
                // find better way to check undefined val
                return board[cord[0]][cord[1]]
                    && board[cord[0]][cord[1]]?.color == turn
                    && board[cord[0]][cord[1]]?.type == 'k';
            });

    if (kingSquare === undefined) return true;

    const opponentTurn = nextTurn(turn);
    const opponentCords =
        SQUARES
            .filter(square => {
                const cord = getCordFromSquare(square);
                return board[cord[0]][cord[1]]
                    && board[cord[0]][cord[1]]?.color == opponentTurn;
            })
            .map(square => getCordFromSquare(square));

    const kingCord = getCordFromSquare(kingSquare);
    for (const opponentCord of opponentCords) {
        // if there is a valid movement from opponent piece to current king
        if (isValidMovement(board, opponentCord, kingCord)) {
            return false;
        }
    }

    return true;
};

export default checkBoard;