import { useState } from "react";
import { findRandomPosition } from "../../../chess/positionFinder";
import Chessboard from "./boardLayout";
import styles from './Chessboard.module.scss';

const PlaygroundBoard = ({ pieces }: any) => {
    const generateNewPosition = () => {
        const randomFen = findRandomPosition(pieces);
        setFen(randomFen);
    };

    const [fen, setFen] = useState<string>(findRandomPosition(pieces));

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

