const SubmissionGuidelines = () => {
    return (<>
        <div>
            <h1>Submission Guidelines</h1>
            <p>{`
                The questions are of interactive nature so take care of flusing correctly
                The reasons may not be always apparent, but if its not success, there's something wrong with your submission
                Check the moves to compare outputs.
                Check the solution to see if your logic, output format etc. matches with the solution
                Submission may take around 2-3 mins to complete`
            }
            </p>
            <HelpfulSnippets />
        </div>
    </>);
}

export default SubmissionGuidelines;

const HelpfulSnippets = () => {
    return (<>
        <div>
            <h2>Helpful Snippets</h2>
            <p>Snippets which are helpful</p>
        </div>
    </>);
}