
const Page = () => {
    return (<>
        <div
            style={{
                display: "grid",
                height: "40rem",
                width: "80rem",
                overflow: "clip",
                outline: "5px solid black",
                margin: "2rem",
                minHeight: "0",
                minWidth: "0"
            }}>
            <div
                style={{
                    gridColumn: "1 / span 3",
                    gridRow: "1 / span 3",
                    backgroundColor: "red",
                    overflow: "clip",
                    minHeight: "0",
                    minWidth: "0"
                }}>
                <div
                    style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        overflow: "hidden"
                    }}>
                    dvfd
                </div>
                {/* <AnimatedBoardWrapper /> */}
            </div>
            <div
                style={{
                    gridColumn: "4 / span 5",
                    gridRow: "1 / span 1",
                    backgroundColor: "blue",
                    overflow: "clip",
                    minHeight: "0",
                    minWidth: "0"
                }}>
            </div>
            <div
                style={{
                    gridColumn: "5 / span 4",
                    gridRow: "2 / span 3",
                    backgroundColor: "green",
                    overflow: "clip",
                    minHeight: "0",
                    minWidth: "0"
                }}>
                {/* Hello, this is an editor text */}
                {/* <AnimatedEditor fullCode={`dsfds`} /> */}
            </div>
            <div
                style={{
                    gridColumn: "1 / span 4",
                    gridRow: "4 / span 1",
                    backgroundColor: "aqua",
                    overflow: "clip",
                    minHeight: "0",
                    minWidth: "0"
                }}>
            </div>
        </div>
    </>);
};

export default Page;