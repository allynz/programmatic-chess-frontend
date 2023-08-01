import MySubmissionList from "../../components/hooks/mySubmissionList";
import PageWrapNav from "../../components/navbar/pageWrapper";

const MySubmissions = () => {
    return (<>
        <PageWrapNav>
            <div
                style={{
                    paddingTop: "2rem",
                    display: "grid",
                    gridTemplateRows: "100%",
                    gridTemplateColumns: "20% 60% 20%"
                }}>
                <br></br>
                <MySubmissionList />
                <br></br>
            </div>
        </PageWrapNav>
    </>);
};

export default MySubmissions;

const UnsignedUserComponent = () => {
    return (<>
        Sign In to view your submissions
    </>);
}