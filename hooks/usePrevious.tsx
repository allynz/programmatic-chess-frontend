import { useEffect, useRef } from "react";

// https://usehooks.com/usePrevious/ - see typescript declaration
export const usePrevious = (value: any) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};