import { Piece } from "../chess/types";

export type Problem = {
    id: number,
    statement: string,
    solution: string,
    pieces: Array<Piece>,
    defaultCode: string,
    examples: Array<any>,
    // this is the raw backend form, need to be converted in the frontend form to be actually used on client
    randomValidBoards: Array<Array<Array<string>>>
};