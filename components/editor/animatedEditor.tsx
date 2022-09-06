
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

// TODO: There is some cutting off of code in the beginning, but it's fine, fix later
const AnimatedEditorWrapper = ({ fullCode }: any) => {
    return (
        <div
            style={{
                // WOHOOOO
                pointerEvents: "none",
                height: "100%",
                width: "100%",
                overflow: "clip",
                backgroundColor: "black" // nice hack for now
            }}>
            <AnimatedEditor
                fullCode={fullCode} />
        </div>
    );
}

const AnimatedEditor = ({ fullCode }: { fullCode: string }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    const [code, setCode] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) return;

        let res: string = "";
        let idx = 0;

        const interval = setInterval(
            () => {
                if (!mounted) return;

                if (idx < fullCode.length) {
                    res += fullCode.at(idx);
                    idx++;
                    //setCode(res);
                    // nice, this doesn't cause flicker: https://github.com/Microsoft/monaco-editor/issues/803 WOOHOOO!
                    editorRef.current?.getModel()?.applyEdits([
                        {
                            forceMoveMarkers: true,
                            range: {
                                startLineNumber: idx, // what what? this is needed? apprently yes
                                endLineNumber: 10000,
                                startColumn: 1,
                                endColumn: 10000,
                            },
                            text: fullCode.at(idx) || null
                        }
                    ]);
                    // reveals both row and col
                    editorRef.current?.revealPosition(
                        {
                            lineNumber: editorRef.current
                                .getModel()?.getLineCount() || 0,
                            column: editorRef.current
                                .getModel()?.getLineLength(editorRef.current
                                    .getModel()?.getLineCount() || 0) || 0
                        });
                } else {
                    idx = 0;
                    res = "";
                }
            },
            50
        );

        return () => clearInterval(interval);
    }, [mounted]);

    return (<>
        <Editor
            theme="vs-dark"
            options={{
                fontSize: 17,
                readOnly: true,
                lineNumbers: 'off',
                minimap: { enabled: false },
                scrollbar: {
                    vertical: "hidden",
                    horizontal: "hidden",
                    horizontalSliderSize: 0,
                    verticalSliderSize: 0,
                    arrowSize: 0
                }
            }}
            language="cpp"
            // TODO: See if you can remove this loading, atleast for landing page
            loading={<Spinner animation={"border"} />} // probably using UserContext we can keep global state as loading
            onMount={
                (editor, monaco) => {
                    // WOW!!! very cool, but do it inside here only, as outside it is causing some CSS error, test this also in multiple browsers
                    editor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        function () { });
                    editorRef.current = editor; // doesnt matter before or after addCommand, prob because change is in place

                    setMounted(true); // used so that the initial few text doesn't get scrapped off
                }
            }
            value={code}
        />
    </>);
};

export default AnimatedEditorWrapper;