const PageBottom = () => {
    return (<>
        <div
            style={{
                // can combine with top for padding but whatever, its fine now
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
            {/* Where to go from here - Links to other areas - problems, about page important infos */}
            {/* Quirky footer in the bottom */}
            <FAQ />
            <NextLinks />
        </div>

    </>);
};

export default PageBottom;

const FAQ = () => {
    return (
        <div>
            <h1>Frequently Asked Questions (FAQ)</h1>
            <ul style={{}}>
                <li
                    style={{ fontSize: "2rem" }}>
                    <div>
                        <h3>Who is this website for?</h3>
                        <p>For everyone, but know the basics of programming and C++ language</p>
                    </div>
                </li>
                <li
                    style={{ fontSize: "2rem" }}>
                    <div>
                        <h3>Supported Languages</h3>
                        <p>Only C++ for now</p>
                    </div>
                </li>
                <li
                    style={{ fontSize: "2rem" }}>
                    <div>
                        <h3>How can I submit a solution on this platform</h3>
                        <p>Need to sign in using google account</p>
                    </div>
                </li>
                <li
                    style={{ fontSize: "2rem" }}>
                    <div>
                        <h3>Contact Details</h3>
                        <p>site@site.com</p>
                    </div>
                </li>
            </ul>
        </div>
    );
};

const NextLinks = () => {
    return (<>
        <h1>What Next</h1>
        <div>
            <p>Solve problems [here](link)</p>
            <p>Read about rules and other stuff in the about section: [here](about)</p>
        </div>
    </>);
};