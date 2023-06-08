import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import PaginationComponent from "../../components/information/submissionTable/paginationComponent";

const PaginationTest = () => {
    return (<>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
            }}>
            <ArrowLeftCircleFill size={20} />
            <p>dhhhdg</p>
        </div>
        <PaginationComponent
            isFirstPage={false}
            isLastPage={false}
            setFirstPage={() => { }}
            nextPage={() => { }}
            prevPage={() => { }} />
    </>);
};

export default PaginationTest;