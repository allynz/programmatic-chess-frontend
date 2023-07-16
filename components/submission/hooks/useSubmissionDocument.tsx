import { DocumentData } from "firebase/firestore";
import { useContext } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import UserContext from "../../../contexts/UserContext";
import { getDocument } from "../../../firebase/config";

// use onSnapshot directly if any issues with updating user
// normally user will sign out before chaning account so user status will change while changing accounts
export const useSubmissionDocument = (id: string): DocumentData => {
    const user = useContext(UserContext);
    const docRef = getDocument(id);
    const [doc, loading, error] = useDocumentData(user ? docRef : undefined);

    if (error) return { status: "ERROR" };
    if (loading) return { status: "LOADING..." };
    if (doc) return doc;

    return { status: "UNKNOWN ERROR" }
};