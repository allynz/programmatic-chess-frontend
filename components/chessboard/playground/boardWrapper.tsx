import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import { convertBackendBoardToFrontend1, getFen, getRandomInt } from "../../../chess/utilities";
import Chessboard from "./boardLayout";
import styles from './Chessboard.module.scss';

const PlaygroundBoard = ({ pieces, board }: any) => {
    const generateNewFen = () => {
        if (board && board.length > 0) {
            const randomInt = getRandomInt(board.length);
            const randomBackendBoard = board[randomInt];
            const randomFrontendBoard = convertBackendBoardToFrontend1(randomBackendBoard);
            const randomFen = getFen(randomFrontendBoard);
            return randomFen;
        } else {
            const randomFen = findRandomPosition(pieces);
            return randomFen;
        }
    };

    const generateNewPosition = () => {
        setFen(generateNewFen());
    };

    const [fen, setFen] = useState<string>(generateNewFen());

    // need to keep it fixed due to chessground CSS issue
    return (<>
        <div className={styles.boardWrap}>
            <p>
                Chessboard for tinkering with current problem
            </p>
            <Chessboard
                startFen={fen}
                newPositionGeneration={generateNewPosition} />
        </div>
    </>);
}

export default PlaygroundBoard;

