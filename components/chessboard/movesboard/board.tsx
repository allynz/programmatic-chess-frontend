import { Chess, ChessInstance } from 'chess.js';
import { Chessground } from 'chessground';
import { Api } from 'chessground/api';
import { useEffect, useState } from 'react';
import 'react-chessground/dist/styles/chessground.css'; // TODO: Find correct stylesheet, important to render though - https://github.com/lichess-org/chessground
import 'react-multi-carousel/lib/styles.css';
import { usePrevious } from '../../../hooks/usePrevious';

// https://blog.logrocket.com/accessing-previous-props-state-react-hooks/ - create own usePreviousState hook
// Block cursor on board
const Board = ({ config, movesList, idx }: any) => {

    const [ground, setGround] = useState<Api>(); // amazing, use useState and it will remember state, otherwise not if it is a let variable
    const [chess, setChess] = useState<ChessInstance>(new Chess()); // need to useState as it was rendering again if just const was used
    const prevIdx = usePrevious(idx) || 0;

    // nneded as we need to do this on client side and next js performs first on server side
    // only need to run it in first render
    useEffect(() => {
        setGround(
            Chessground(
                document.getElementById("board") || document.body,
                // viewOnly attr is amazing, user cannot interact with the board directly but I can programmatically
                { coordinates: true, viewOnly: true }));
        console.log("again");
    }, [movesList]); // moveList may ensure that this block is run only once, but checking could take time so find a faster way(key prop?)

    // moveToIdx useEffect
    // capturing distorts the board so just keep that in mind
    useEffect(() => {
        // why do I have to keep assigning it? any workaround for it
        //if (idx == 0) return;
        // continous move till idx
        let i: number = prevIdx;
        if (i < idx) {
            while (i < idx) {
                i++;
                const nn: string = movesList.at(i);
                chess.move(nn);
            }
            ground && ground.set({ fen: chess.fen() }); // have this outside as it is same even for (i < idx) case
        } else if (i > idx) {
            // cannot undo like this as captures are removed - https://github.com/lichess-org/chessground/issues/63
            while (i > idx) {
                chess.undo();
                i--;
            }
            ground && ground.set({ fen: chess.fen() });
        }
    }, [idx]);

    return (<>
        {/* Width should be same as of the carousel */}
        {/* for some reason aspectRatio is not working so have to set both height and width */}
        <div
            id="board" // for multiple divs, need to make this dynamic also
            style={{
                overflow: "clip",
                width: config.width,
                height: config.height
            }}>

        </div>
    </>);
}

export default Board;