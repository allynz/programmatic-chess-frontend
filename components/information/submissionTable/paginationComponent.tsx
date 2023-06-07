import { Pagination } from "react-bootstrap";

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
                onClick={() => setFirstPage()} />
            {/* using function directly like {prevPage()} causes calling the function directly so use correct syntax by {() => func()} for onclick*/}
            <Pagination.Prev
                disabled={isFirstPage}
                onClick={() => prevPage()} />

            {/* <Pagination.Item disabled>{currentPageNum}</Pagination.Item> */}

            <Pagination.Next
                disabled={isLastPage}
                onClick={() => nextPage()} />
        </Pagination>
    </>);
};

export default PaginationComponent;