import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type Type1 = {
    pageInfo: {
        pageSnapshotDocs: QueryDocumentSnapshot<DocumentData>[],
        isFirstPage: boolean,
        isLastPage: boolean
    },
    loading: boolean,
    handlePageUpdate:
    ({ type, lastPageInfo }: {
        type: 'forward' | 'backward',
        lastPageInfo: {
            firstDoc: QueryDocumentSnapshot<DocumentData> | undefined,
            lastDoc: QueryDocumentSnapshot<DocumentData> | undefined
        }
    }) => Promise<void>,
    setFirstPage: () => void,
    error: boolean
};