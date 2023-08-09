import { useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import Loading from "../../general/loading";
import { SubmissionTable } from "../submissionTable";
import { usePaginationInfo } from "./hooks/usePaginationInfo";
import PaginationComponent from "./paginationComponent";
import { Type1 } from "./types";

const PAGE_SIZE_LIMIT = 25;

// page numbers are not consistent with constantly updating collection, so don't use that
// color success in green, and unsuccess in red
const SubmissionTableHandler = ({ queries }: any) => {
    const user = useContext(UserContext);
    const userId = user?.uid || "dummy";

    // make sure that hooks are called even if user is unsigned, otherwise it can lead to errors once user is signed in
    const res: Type1 = usePaginationInfo({
        // it's best to pass the userId from here itself, for ease of use later, hooks shouldn't have to worry about userId
        // read more about currying and how to best use it for objects
        // also if i'm using userId in usePagination hook, then is it still right to pass userId from here?
        firstPageDataHook:
            () => queries.FIRST_PAGE_HOOK(
                { userId: userId, limitValue: PAGE_SIZE_LIMIT + 1 }),
        fetchQueryForward:
            queries.FETCH_NEXT_QUERY(
                { userId: userId, limitValue: PAGE_SIZE_LIMIT + 1 }),
        fetchQueryBackward:
            queries.FETCH_PREV_QUERY(
                { userId: userId, limitValue: PAGE_SIZE_LIMIT + 1 }),
        pageSizeLimit: PAGE_SIZE_LIMIT
    });

    const {
        pageInfo,
        loading,
        handlePageUpdate,
        setFirstPage,
        error
    } = res;

    // this useEffect is important, it does an important task of refreshing the hook so that new user data will be fetched
    // the problem occurs when u sign out and login as different user, the previous data will be shown, this is the fix for it
    useEffect(() => {
        setFirstPage();
    }, [userId]);

    if (!user) {
        return (
            <SubmissionContent
                isFirstPage={true}
                isLastPage={true}
                setFirstPage={setFirstPage}
                handlePageUpdate={handlePageUpdate}
                pageSnapshotDocs={[]}
                submissionList={[]}
                customMessage={`Sign In to view your submissions`} />
        )
    }

    // for checking difference between states
    // const prevRes = usePrevious(res);
    // useEffect(() => {
    //     console.log("prevRes", prevRes);
    //     console.log("currRes", res);
    //     console.log("isEqualRes", eq(prevRes, res));
    //     console.log("resdiff", getDifference(prevRes, res));
    // }, [pageInfo]);

    const { pageSnapshotDocs, isFirstPage, isLastPage } = pageInfo;
    const submissionList = pageSnapshotDocs?.map(doc => doc.data());

    if (loading) return <LoadingContent />;
    if (error) return <ErrorContent />;

    return (
        <SubmissionContent
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            setFirstPage={setFirstPage}
            handlePageUpdate={handlePageUpdate}
            pageSnapshotDocs={pageSnapshotDocs}
            submissionList={submissionList} />
    );
};

export default SubmissionTableHandler;

const ErrorContent = () => {
    return (<>
        <div>
            Error, please try again later
        </div>
    </>);
};

const LoadingContent = () => {
    return (<>
        <Loading />
    </>);
};

const SubmissionContent = ({
    isFirstPage,
    isLastPage,
    setFirstPage,
    handlePageUpdate,
    pageSnapshotDocs,
    submissionList,
    customMessage
}: any) => {
    return (<>
        {/* without the div, rendering was horizontal, not vertical */}
        <div>
            <PaginationComponent
                isFirstPage={isFirstPage}
                isLastPage={isLastPage}
                setFirstPage={setFirstPage}
                nextPage={() =>
                    handlePageUpdate({
                        type: 'forward',
                        lastPageInfo: {
                            firstDoc: pageSnapshotDocs?.at(0),
                            lastDoc: pageSnapshotDocs?.at(-1)
                        }
                    })}
                prevPage={() =>
                    handlePageUpdate({
                        type: 'backward',
                        lastPageInfo: {
                            firstDoc: pageSnapshotDocs?.at(0),
                            lastDoc: pageSnapshotDocs?.at(-1)
                        }
                    })} />
            <SubmissionTable
                submissionList={submissionList}
                customMessage={customMessage} />
        </div>
    </>);
}
