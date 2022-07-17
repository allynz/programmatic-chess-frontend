import { Chessground } from 'chessground';
import { Api } from 'chessground/api';
import { useEffect, useId, useState } from 'react';
// TODO: Find correct stylesheet, important to render though - https://github.com/lichess-org/chessground
import { Square } from '../../../chess/types';

// https://blog.logrocket.com/accessing-previous-props-state-react-hooks/ - create own usePreviousState hook
// Block cursor on board
// TODO: Don't render too many chessboards at once, it will eat up your js, make it faster though as we only need this for viewing - basically keep track of only the fen's at various moments - use a stack to save space
// This is a static board so startFen and movesList won't change, if they do, then use useEffect to update
// See if movesList is properly handled, especially if it contains last status
const Board = ({ startFen, movesList, idx }: any) => {
    const boardId = useId();

    const [ground, setGround] = useState<Api>(); // amazing, use useState and it will remember state, otherwise not if it is a let variable
    const [stack, setStack] = useState<FenStack>(new FenStack(startFen));

    // nneded as we need to do this on client side and next js performs first on server side
    // only need to run it in first render
    useEffect(() => {
        setGround(
            Chessground(
                document.getElementById(boardId) || document.body, // very important to have element present otherwise whole body will be taken
                // viewOnly attr is amazing, user cannot interact with the board directly but I can programmatically
                // don't highlight last move, it may have issues
                // make config global so it is smae for all, the non-required fields atleast
                {
                    coordinates: true,
                    viewOnly: true,
                    highlight: {
                        lastMove: false
                    }
                })); // see if we need to highlight here so changing config accordingly
    }, [movesList]); // moveList may ensure that this block is run only once, but checking could take time so find a faster way(key prop?)

    // moves both back and forward
    // idx < movesList size is not checked
    // hope to god that ground is present
    // should we put it inside useEffect, it will be reassigned if any params change(idx) - see later, rn not issue
    const moveToIdx = (newIdx: number) => {
        let maxKnownIdx = stack.getMaxIdx();

        if (maxKnownIdx < newIdx) {
            // maxKnown >= prevIdx
            ground?.set({ fen: stack.get(maxKnownIdx) });
            while (maxKnownIdx < newIdx) {
                maxKnownIdx++;
                const nn: string = movesList.at(maxKnownIdx);
                const
                    orig = nn.split('-').at(0),
                    dest = nn.split('-').at(1);
                ground?.move(orig as Square, dest as Square);
                stack.push(ground?.getFen());
            }
        } else {
            // not necessary if newIdx === prevIdx but no issue anyway
            ground?.set({ fen: stack.get(newIdx), viewOnly: true });
            return;
        }
    };

    // moveToIdx useEffect
    // capturing distorts the board so just keep that in mind
    useEffect(() => {
        moveToIdx(idx);
    }, [idx]);

    return (<>
        {/* Width should be same as of the carousel */}
        {/* for some reason aspectRatio is not working so have to set both height and width */}
        {/* if we put parent div outisde, it won't clip the bottom */}
        {/* do more tinkering to see which all properties are actually needed */}
        <div
            style={{
                // padding needs to be same for all so we can get a sqaure parent container for board
                padding: "10px", // can we make this also auto somehow? as screen size increases this may get cropped
                overflow: "clip", // clip here only, no complications at the top
                aspectRatio: "1/1",
                maxHeight: "100%",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "0 auto" // needed as board has margin of it's own, auto aligns to center though // https://developer.mozilla.org/en-US/docs/Web/CSS/margin
            }}>
            {/* make this non-clickable somehow, could not find anything in config, or using cursor property directly on div */}
            <div
                id={boardId} // for multiple divs, need to make this dynamic also
                style={{
                    aspectRatio: "1/1",
                    // seems better than height: auto as auto is controlled by browser
                    maxHeight: "100%",
                    maxWidth: "100%",
                    // removes hand cursor so should be fine
                    pointerEvents: "none"
                }}>

            </div>
        </div>
    </>);
}

export default Board;

// Use 0-based indexing
class FenStack {
    stack: Array<string>;

    constructor(startFen: string) {
        this.stack = [startFen];
    }

    getMaxIdx(): number {
        return this.stack.length - 1;
    }

    get(idx: number): string {
        return this.stack.at(idx) || '';
    }

    push(fen?: string) {
        if (fen) {
            this.stack.push(fen);
        }
    }
}