import { SQUARES } from "./config";
import isRawValidMovement from "./movementChecker";
import { Board, Color, Cord, Piece, Square } from "./types";
import { getCordFromSquare, nextTurn } from "./utilities";

// Hmmm, should we use Object oriented instead? How does the boardState object access it
// current turns king is not in check
// board should be slightly valid, only one piece per square
// opponent king can't be in check during my turn
function checkBoard(
    turn: Readonly<Color>,
    board: Readonly<Board>): boolean {
    // put this function inside board class itslef, it is used too often
    const piece = (cord: Cord): Piece | undefined => {
        return board[cord[0]][cord[1]];
    }

    // remove if condition and turn into one block
    // check for undefined before converting
    const opponentTurn = nextTurn(turn);
    const opponentKingSquare: Square | undefined =
        SQUARES
            .find(square => {
                const cord: Cord = getCordFromSquare(square);
                // find better way to check undefined val
                return piece(cord)
                    && piece(cord)?.color == opponentTurn
                    && piece(cord)?.type == 'k';
            });

    if (opponentKingSquare === undefined) return true;

    const currPieceCords =
        SQUARES
            .filter(square => {
                const cord = getCordFromSquare(square);
                return piece(cord)
                    && piece(cord)?.color == turn;
            })
            .map(square => getCordFromSquare(square));

    const kingCord = getCordFromSquare(opponentKingSquare);
    for (const opponentCord of currPieceCords) {
        // if there is a valid movement from opponent piece to current king
        if (isRawValidMovement(board, opponentCord, kingCord)) {
            return false;
        }
    }

    return true;
};

export default checkBoard;