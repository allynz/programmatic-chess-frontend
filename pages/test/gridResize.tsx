
const Page = () => {
    return (<>
        <div
            //className={styles.topGrid}
            style={{
                display: "grid"
            }}>
            <div
                style={{
                    gridColumn: "1 / span 2",
                    gridRow: "1 / span 2",
                    backgroundColor: "red",
                    overflow: "hidden",
                    minWidth: "0"
                }}>
                <p>fdsgsdgdsfcfvvdfvdsvsddsv</p>
            </div>
            <div
                style={{
                    gridColumn: "3 / span 2",
                    gridRow: "1 / span 2",
                    backgroundColor: "blue",
                    overflow: "hidden",
                    minWidth: "0"
                }}>

            </div>
        </div>
    </>);
};

export default Page;