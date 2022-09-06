import ReactMarkdown from "react-markdown";

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
    const markdownString = `
# Frequently Asked Questions (FAQ)

### Who is this website for?
#### To anyone who's looking to improve their programming skills
#### One should be familiar with the basics of programming, and one of the supported programming languages like C++
#### Do brush up/learn the basics and language syntax before tackling the problems

### What are the supported languages for writing code on this platform?
#### Currently, only C++ is supported(C++17 version to be specific)
#### More supported languages soon to arrive

### How can I submit a solution on this platform?
#### First you need to sign in 
#### Then go to the particular page of the problem you'd like to submit the solution for
#### Then write your code on the editor provided on the page, and submit
#### Wait for the grader to complete evaluation of the code

### Contact details?
#### site@site.com
#### More details can be found on the [aboutPage]

    `;
    // return (
    //     <div>
    //         <h1>Frequently Asked Questions (FAQ)</h1>
    //         <ul style={{}}>
    //             <li
    //                 style={{ fontSize: "2rem" }}>
    //                 <div>
    //                     <h3>Who is this website for?</h3>
    //                     <p>For everyone, but know the basics of programming and C++ language</p>
    //                 </div>
    //             </li>
    //             <li
    //                 style={{ fontSize: "2rem" }}>
    //                 <div>
    //                     <h3>Supported Languages</h3>
    //                     <p>Only C++ for now</p>
    //                 </div>
    //             </li>
    //             <li
    //                 style={{ fontSize: "2rem" }}>
    //                 <div>
    //                     <h3>How can I submit a solution on this platform</h3>
    //                     <p>Need to sign in using google account</p>
    //                 </div>
    //             </li>
    //             <li
    //                 style={{ fontSize: "2rem" }}>
    //                 <div>
    //                     <h3>Contact Details</h3>
    //                     <p>site@site.com</p>
    //                 </div>
    //             </li>
    //         </ul>
    //     </div>
    // );

    return (
        <ReactMarkdown>
            {markdownString}
        </ReactMarkdown>
    );
};

const NextLinks = () => {
    return (<>
        <h1>Whats Next?</h1>
        <div>
            <p>Head over to the problems library to view the full list of available problems [here](problems page)</p>
            <p>Read about rules and guidelines in the about section [here](about)</p>
            <p>Enjoy!</p>
        </div>
    </>);
};