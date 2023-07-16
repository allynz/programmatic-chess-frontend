import { useDocumentData } from "react-firebase-hooks/firestore";
import { getDocument } from "../../../firebase/config";
import { useCode } from "./useCode";

export const useSubmissionData = (id: string) => {
    const [code, codeLoading, codeError] = useCode(id);
    const [doc, docLoading, docError] = useDocumentData(getDocument(id));

    return {
        code: code,
        doc: doc,
        loading: codeLoading || docLoading,
        error: codeError || docError
    }
};