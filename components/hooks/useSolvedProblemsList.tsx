import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import UserContext from "../../contexts/UserContext";
import { getSolvedProblemsDocument } from "../../firebase/config";

// should be a react component or custom hook to use hooks inside of it, rules of hook
export const useSolvedProblemsList = (): Array<number> => {
    const user = useContext(UserContext);
    const docRef = getSolvedProblemsDocument(user?.uid || "dummy");
    // useDocumentData updates again on receiving so it's better than useOnce hook
    // but it's a hook so more reads I guess
    const [value, loading, error] = useDocumentData(docRef);

    // apparently, cannot have early return when using hooks later on
    if (user && value) {
        return value?.solvedProblemIds
            .map((p: string) => Number.parseInt(p)) || [];
    } else {
        return [];
    }
}