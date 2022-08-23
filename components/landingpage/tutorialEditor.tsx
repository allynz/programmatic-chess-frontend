import EditorDisplay from "../editor/editorDisplay";
import { useDataMap } from "../hooks/useDataMap";
import ProblemDisplay from "../information/problemDisplay";

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