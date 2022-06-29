import { isEqual } from "lodash";
import { isDeepStrictEqual } from "util";

export const arrayEquals = (a: Array<any>, b: Array<any>) => {
    if (a === b) return true;
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    return a.every((val, idx) => b.at(idx) === val);
}

// cant decide between isDeepStrictEqual vs isEqual - check for vulnerabilities and choose one
export const eq = (a: any, b: any) => {
    return isEqual(a, b);
}