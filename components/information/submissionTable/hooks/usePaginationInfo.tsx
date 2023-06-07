import { DocumentData, Query, QueryDocumentSnapshot } from "firebase/firestore";
import { useState } from "react";
import { Type1 } from "../types";
import { useFirstPage } from "./useFirstPage";
import { useSubsequentPage } from "./useSubsequentPage";

type Type = {
    firstPageDataHook: () => Query<DocumentData>,
    fetchQueryForward: ({ lastDocument }: {
        lastDocument: QueryDocumentSnapshot<DocumentData>
    }) => Query<DocumentData>,
    fetchQueryBackward: ({ firstDocument }: {
        firstDocument: QueryDocumentSnapshot<DocumentData>
    }) => Query<DocumentData>,
    pageSizeLimit: number
};

export const usePaginationInfo = ({
    firstPageDataHook,
    fetchQueryForward,
    fetchQueryBackward,
    pageSizeLimit
}: Type): Type1 => {
    const [loading, setLoading] = useState(false);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const {
        loading: firstPageLoading,
        snapshot: firstPageSnapshot,
        isLastPage: isFirstPageLast,
        error: errorFirstPage
    }: any = useFirstPage({
        hook: firstPageDataHook,
        pageSizeLimit: pageSizeLimit
    });
    const {
        loading: subsequentPageLoading,
        pageInfo: subsequentPageInfo,
        paginate: paginateSubsequentPage,
        // child can have its own state, just parent state should be final in all scenarios
        setToFirstPage: setSubsequentPageToFirst,
        error: errorSubsequentPage
    }: any = useSubsequentPage({
        fetchBackward: fetchQueryBackward,
        fetchForward: fetchQueryForward,
        setFirstPage: (status: boolean) => setIsFirstPage(status),
        pageSizeLimit: pageSizeLimit
    });

    // need to have lastPage params, as a function is set if it is passed to another component, it will always have undeinfed first and lastDoc, when they were set initially and we passed it to another component
    // it is static forever since beginning, cannot have it depend on 
    const paginate = async ({ type, lastPageInfo }: any) => {
        setLoading(true);
        await paginateSubsequentPage({
            type: type,
            lastPageInfo: lastPageInfo
        });
        setLoading(false);
    }

    let pageObject = {};
    if (isFirstPage) {
        pageObject = {
            pageInfo: {
                pageSnapshotDocs: firstPageSnapshot,
                isFirstPage: true,
                isLastPage: isFirstPageLast
            },
            loading: firstPageLoading || loading,
            error: errorFirstPage
        };
    } else {
        pageObject = {
            pageInfo: subsequentPageInfo,
            loading: subsequentPageLoading || loading,
            error: errorSubsequentPage
        };
    }

    const res = Object.assign(
        {},
        pageObject,
        {
            handlePageUpdate: paginate,
            setFirstPage: () => setIsFirstPage(true)
        });

    return res as Type1;
};
