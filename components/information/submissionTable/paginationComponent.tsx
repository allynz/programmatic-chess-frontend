import { Pagination } from "react-bootstrap";
import { ArrowClockwise, ArrowLeftCircleFill, ArrowRightCircleFill } from "react-bootstrap-icons";

const PaginationComponent = ({
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
    setFirstPage
}: any) => {
    return (<>
        <Pagination
            style={{
                display: "flex",
                justifyContent: "center",
                width: "100%" // try to stretch it to the max, mayb grid, or some width property?
            }}>
            <Pagination.First
                disabled={isFirstPage}
                onClick={() => setFirstPage()}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: "14rem"
                    }}>
                    <ArrowClockwise size={23} />
                    <div>View latest submissions</div>
                </div>
            </Pagination.First>
            {/* using function directly like {prevPage()} causes calling the function directly so use correct syntax by {() => func()} for onclick*/}
            <Pagination.Prev
                disabled={isFirstPage}
                onClick={() => prevPage()}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: "10rem"
                    }}>
                    <ArrowLeftCircleFill size={23} />
                    <div>Previous page</div>
                </div>
            </Pagination.Prev>

            {/* <Pagination.Item disabled>{currentPageNum}</Pagination.Item> */}

            <Pagination.Next
                disabled={isLastPage}
                onClick={() => nextPage()}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: "8rem"
                    }}>
                    <div>Next page</div>
                    <ArrowRightCircleFill size={23} />
                </div>
            </Pagination.Next>
        </Pagination>
    </>);
};

export default PaginationComponent;