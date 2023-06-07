import { DocumentData, Query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

// should we have just `loading` and the rest of the vars empty if it is loading? Seems like a good idea, see how react-firebase-hook does it
export const useFirstPage = ({ hook, pageSizeLimit }: { hook: () => Query<DocumentData>, pageSizeLimit: number }) => {
    // mmaybe the snapshot update(timestamp?) is causing multiple rendering of submissions page, we can just send the relevant info instead
    const [value, loading, error, snapshot1] = useCollectionData(hook());

    const isLastPage =
        snapshot1?.size ?
            snapshot1?.size <= pageSizeLimit :
            true;
    return {
        snapshot: snapshot1?.docs.slice(0, pageSizeLimit),
        loading: loading,
        isLastPage: isLastPage
    }
};