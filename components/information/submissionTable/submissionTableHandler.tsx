import { useContext } from "react";
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
    const userId = useContext(UserContext)?.uid || "dummy";
    const res: Type1 = usePaginationInfo({
        // it's best to pass the userId from here itself, for ease of use later, hooks shouldn't have to worry about userId
        // read more about currying and how to best use it for objects
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

    if (error) return <ErrorContent />;
    if (loading) return <LoadingContent />;

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
                submissionList={submissionList} />
        </div>
    </>);
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
