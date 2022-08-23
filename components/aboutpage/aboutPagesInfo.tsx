const AboutPagesInfo = () => {
    return (<>
        <div>
            <h1>Pages</h1>
            <p>The website consists of few important pages which are listed below:</p>
            <HomePage />
            <ProblemsPage />
            <MySubmissionsPage />
            <AboutPage />
        </div>
    </>);
}

export default AboutPagesInfo;

// add pics
const HomePage = () => {
    return (<>
        <div>
            <h4>HomePage</h4>
            <p>The first page that the user sees on entering codingchess.com</p>
            <p>Can be reached through clicking the codingChess icon on the Nav</p>
        </div>
    </>);
}

// add pics
const ProblemsPage = () => {
    return (
        <div>
            <h4>Problems</h4>
            <p>You can view a list of problems and click on them to see th</p>
            <h5>Specific problem page</h5>
            <p>You can view the problem statement, solution,
                view submissions and playground.
                Also write submission and submit it for assessment.
                See more in submission guidelines for writing a good submission.
                Can also resize it using divider
                A green tick will be displayed if you have already solved the problem
                Submission is only allowed if you are signed in</p>
        </div>
    );
}

const MySubmissionsPage = () => {
    return (<>
        <div>
            <h3>My Submissions</h3>
            <p>View all your submissions. Click on submissionId of any submission to see it's details</p>
            <h5>Submission Details Page</h5>
            <p>View details of a particular submission including failure cases, moves board etc.</p>
        </div>
    </>);
}

const AboutPage = () => {
    return (<>
        <div>
            <h4>About Page</h4>
            <p>This page!! Where you can view general info about the site</p>
        </div>
    </>);
}