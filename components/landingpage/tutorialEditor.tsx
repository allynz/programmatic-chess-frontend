import EditorDisplay from "../editor/editorDisplay";
import ProblemDisplay from "../information/problemDisplay";
import { useDataMap } from "../information/problemDisplayData";

// submit them to a different faster queue
const TutorialEditor = ({ problem }: any) => {
    return (<>
        <div
            style={{
                display: "grid",
                height: "30rem",
                gridTemplateRows: "100%",
                gridTemplateColumns: "7% 40% 5% 40% 7%"
            }}>
            <br></br>
            <ProblemDisplay
                problem={problem}
                createDataMap={useDataMap}
                // keep false here
                isSolved={false} />
            <br></br>
            {/* Have a bouncing tooltip on Submit to draw attention */}
            <EditorDisplay
                problemId={problem.id}
                defaultCode={problem.defaultCode} />
            <br></br>
        </div>
    </>);
};

export default TutorialEditor;