import Image from "next/image";
import PageWrapNav from "../components/navbar/pageWrapper";

// This prevents the continous reloading of page when `not found` is thrown in getStaticPaths so keeping it
// Needed to add pageWrapNav otherwise nprogressbar error shows up
// Keep all files required for it on the client itself, no need to fetch from server
const Page = () => {
    return (<>
        <PageWrapNav constrainToViewport>
            <div
                className={`fit-container clip-overflow`}
                style={{
                    display: "grid",
                    gridTemplateRows: "10% 40% 50%",
                    gridTemplateColumns: "100%",
                    justifyItems: "center",
                    backgroundColor: "#273527"
                }}>
                <br />
                <Image
                    src='/images/404-error-g72f430a2f_1920.png'
                    alt="Chessboard"
                    width={"200"}
                    height={"200"}
                    layout="fixed"
                    priority={true} />

                <div
                    style={{
                        color: "white",
                        fontSize: "2rem",
                        fontFamily: `"Lucida Console", Courier, monospace`,
                        textAlign: "center"
                    }}>
                    <p>ERROR ENCOUNTERED AT THIS TIME</p>
                    <p>PLEASE TRY AGAIN LATER</p>
                </div>
            </div>
        </PageWrapNav>
    </>);
}

export default Page;