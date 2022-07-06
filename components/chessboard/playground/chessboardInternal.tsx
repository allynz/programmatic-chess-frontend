import { Chess, SQUARES } from "chess.js";
import { Chessground } from "chessground";
import { Api } from "chessground/api";
import { Config } from "chessground/config";
import { Dests, Key } from "chessground/types";
import { useEffect, useId, useState } from "react";

// Basically make this wrapper stateless
const ChessboardInternal = ({
    fen,
    validMoves,
    moveFunction
}: any) => {
    const config: Config = getConfig(
        fen,
        validMoves,
        // will run on every move, programmatically or dragged, so be careful
        // check if we can drag multiple times or not, prob will be fine but take care of capture square as that can be dragged multiple times
        (orig: Key, dest: Key) => moveFunction(orig, dest)
    );
    const boardId = useId();

    const [ground, setGround] = useState<Api>();
    useEffect(() => {
        // make castling false, as well as autocastle config
        console.log("agaon")
        setGround(
            Chessground(
                document.getElementById(boardId) || document.body,
                config
            ));
        ground?.setAutoShapes([]);
    }, []); // need to use deps otherwise it keeps rendering again, although empty will make sure it runs only once: https://css-tricks.com/run-useeffect-only-once/

    // Do we need useEffect? Can we just update it after config initialisation itself, what about first render, ground will not be available then, but be careful of stateful variables
    useEffect(() => {
        ground?.set(config);
        console.log(ground?.getFen());
    }, [fen, validMoves, moveFunction]); // see if complete props update is fine here

    return (<>
        <div
            style={{
                // padding needs to be same for all so we can get a sqaure parent container for board
                padding: "4rem", // can we make this also auto somehow? as screen size increases this may get cropped
                overflow: "clip", // clip here only, no complications at the top
                aspectRatio: "1/1",
                maxHeight: "100%",
                maxWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black", // make coordinates color different
                margin: "0 auto" // needed as board has margin of it's own, auto aligns to center though // https://developer.mozilla.org/en-US/docs/Web/CSS/margin
            }}>
            {/* make this non-clickable somehow, could not find anything in config, or using cursor property directly on div */}
            <div
                id={boardId} // for multiple divs, need to make this dynamic also
                style={{
                    aspectRatio: "1/1",
                    maxHeight: "200%",
                    maxWidth: "200%"
                    // seems better than height: auto as auto is controlled by browser
                }}>

            </div>
        </div>
    </>);
}

export default ChessboardInternal;

// TODO: make king capture false, although avoid that condition entirely
const getConfig = (fen: string, moves: Dests, moveFunction: any) => {
    //console.log("movesinsideff", moves);
    // TODO: add check config also
    const config: Config = {
        selected: undefined, // fixing annoying square shown when new pos generated bug
        viewOnly: false,
        fen: fen,
        coordinates: true,
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
            move: (orig, dest, capturedPiece) => moveFunction(orig, dest)
        }
    };

    return config;
};