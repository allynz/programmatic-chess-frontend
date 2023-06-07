import to from "await-to-js";
import { DocumentData, Query, QueryDocumentSnapshot, QuerySnapshot, getDocs } from "firebase/firestore";
import { useState } from "react";

type Type = {
    fetchForward: ({ lastDocument }: {
        lastDocument: QueryDocumentSnapshot<DocumentData>
    }) => Query<DocumentData>,
    fetchBackward: ({ firstDocument }: {
        firstDocument: QueryDocumentSnapshot<DocumentData>
    }) => Query<DocumentData>,
    setFirstPage: (status: boolean) => void,
    pageSizeLimit: number
};

export const useSubsequentPage = ({
    fetchForward,
    fetchBackward,
    setFirstPage: setFirstPageParent,
    pageSizeLimit
}: Type) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pageInfo, setPageInfo] = useState<{
        pageSnapshotDocs: QueryDocumentSnapshot<DocumentData>[],
        isFirstPage: boolean,
        isLastPage: boolean
    }>({
        pageSnapshotDocs: [],
        isFirstPage: true,
        isLastPage: true
    });

    const paginateForward = async ({ currentPageInfo }: any) => {
        const query: Query<DocumentData> = fetchForward({
            lastDocument: currentPageInfo.lastDoc
        });

        // check `useServer` to run these types of queries
        const [err, snapshotDocs] = await to<QuerySnapshot<DocumentData>>(getDocs(query));
        if (err || !snapshotDocs) {
            setError(true);
        } else {
            if (error) setError(false);
            setPageInfo({
                pageSnapshotDocs: snapshotDocs?.docs.slice(0, pageSizeLimit),
                isFirstPage: false,
                isLastPage: snapshotDocs.size <= pageSizeLimit
            });

            setFirstPageParent(false);
        }
    };

    const paginateBackward = async ({ currentPageInfo }: any) => {
        const query: Query<DocumentData> = fetchBackward({
            firstDocument: currentPageInfo.firstDoc
        });

        //const snapshotDocs = await getDocs(query);
        const [err, snapshotDocs] = await to<QuerySnapshot<DocumentData>>(getDocs(query));
        if (err || !snapshotDocs) {
            setError(true);
        } else {
            if (error) setError(false);
            const isFirstPage = snapshotDocs?.size <= pageSizeLimit;
            setPageInfo({
                pageSnapshotDocs: snapshotDocs?.docs.slice(0, pageSizeLimit),
                isFirstPage: isFirstPage,
                isLastPage: false
            });
            setFirstPageParent(isFirstPage);
        }
    };

    // handle errors during fetch, give back error screen, ppl will have the option to go to first page
    // needs to handle undefine lastPageInfo
    const paginate = async ({ type, lastPageInfo }: any) => {
        setLoading(true);

        const currentPageInfo = lastPageInfo;
        if (type == 'forward') {
            await paginateForward({
                currentPageInfo: currentPageInfo
            });
        } else if (type == 'backward') {
            await paginateBackward({
                currentPageInfo: currentPageInfo
            });
        }

        setLoading(false);
    }

    const setToFirstPage = () => {
        setPageInfo({
            ...pageInfo,
            ...{
                isFirstPage: true
            }
        });
    }

    return {
        loading: loading,
        pageInfo: pageInfo,
        paginate: paginate,
        setToFirstPage: setToFirstPage
    };
};