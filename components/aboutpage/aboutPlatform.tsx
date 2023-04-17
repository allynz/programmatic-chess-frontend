// Information about the platform and different pages and how they behave
// with pictures and gifs (maybe later, just text is fine for now)

import AboutFAQ from "./aboutFAQ";
import AboutPagesInfo from "./aboutPagesInfo";
import ContactDetails from "./contactDetails";
import SubmissionGuidelines from "./submissionGuidelines";

// LATER: Have font sizes adjusted as per page headings. For now, just default is fine
const AboutPlatform = () => {
    return (<>
        <div>
            <Intro />
            <AboutPagesInfo />
            <SubmissionGuidelines />
            <AboutFAQ />
            <ContactDetails />
        </div>
    </>);
};

export default AboutPlatform;

const Intro = () => {
    return (<>
        <div>
            <h1>About Coding Chess</h1>
            <p>A coding platform</p>
            <p>Main focus is on solving programming problems through code. Most of the problems are related to chess</p>
        </div>
    </>);
}