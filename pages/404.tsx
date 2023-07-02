import PageWrapNav from "../components/navbar/pageWrapper";

// This prevents the continous reloading of page when `not found` is thrown in getStaticPaths so keeping it
// Needed to add pageWrapNav otherwise nprogressbar error shows up
const Page = () => {
    return (<>
        <PageWrapNav>
            <div>Unable to fetch, please try again later</div>
        </PageWrapNav>
    </>);
}

export default Page;