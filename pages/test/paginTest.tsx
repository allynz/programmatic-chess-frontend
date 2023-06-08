import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import PaginationComponent from "../../components/information/submissionTable/paginationComponent";

const PaginTest = () => {
    return (<>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
            <ArrowLeftCircleFill style={{
                fontWeight: "bold"
            }} size={30} />
            <div>dhhokdg</div>
        </div>
        <PaginationComponent
            isFirstPage={false}
            isLastPage={false}
            setFirstPage={() => { }}
            nextPage={() => { }}
            prevPage={() => { }} />
    </>);
};

export default PaginTest;