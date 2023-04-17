import { Chessground } from "chessground";
import { Api } from "chessground/api";
import { Config } from "chessground/config";
import { Dests, Key } from "chessground/types";
import { useEffect, useId, useState } from "react";
// LATER: Fix this style import, it should be accessible easily
import styles from '../playground/Chessboard.module.scss';

// The problem with these chessboards is just don't resize it? As pieces may lose connectivity
const AnimatedBoardInternal = ({
    fen,
    validMoves,
    moveFunction,
    moveMade
}: any) => {
    const config: Config = getConfig(
        fen,
        validMoves,
        // will run on every move, programmatically or dragged, so be careful, but maybe if we just set new fen, it won't move. THe programmitically one is ground.move
        // check if we can drag multiple times or not, prob will be fine but take care of capture square as that can be dragged multiple times
        (orig: Key, dest: Key) => moveFunction()
    );
    const boardId: Readonly<string> = useId();

    const [ground, setGround] = useState<Api>();
    useEffect(() => {
        setGround(
            Chessground(
                document.getElementById(boardId) || document.body,
                config
            ));
        ground?.setAutoShapes([]);
    }, []); // See if I should add deps here as in warning

    // Do we need useEffect? Can we just update it after config initialisation itself, what about first render, ground will not be available then, but be careful of stateful variables
    useEffect(() => {
        ground?.set(config);
    }, [fen, validMoves, moveFunction]); // see if complete props update is fine here

    useEffect(() => {
        //ground?.move(moveMade.orig, moveMade.dest);
    }, [moveMade]);

    return (<>
        <div className={styles.chessboardWrap}>
            {/* make this non-clickable somehow, could not find anything in config, or using cursor property directly on div */}
            <div
                id={boardId} // for multiple divs, need to make this dynamic also
                className={styles.chessboard}>
            </div>
        </div>
    </>);
}

export default AnimatedBoardInternal;

// LATER: make king capture false, although avoid that condition entirely. Currently seems that it is avoided in playground
const getConfig = (fen: string, moves: Dests, moveFunction: any) => {
    // add check config also later
    // make castling false, as well as autocastle config
    const config: Config = {
        selected: undefined, // fixing annoying square shown when new pos generated bug
        viewOnly: true,
        fen: fen,
        coordinates: true,
        autoCastle: false,
        movable: {
            free: false,
            showDests: true,
            dests: moves
        },
        selectable: {
            enabled: true // this way we dont keep the last selected color for a new position change, but find a better fix for it
        },
        highlight: {
            check: true,
            lastMove: false // kept false for now as it renders even when position changed
        },
        events: {
            // stop any more moves after a new move is made
            move: (orig, dest, capturedPiece) => {
                moveFunction();
            }
        }
    };

    return config;
};