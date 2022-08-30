
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";

// TODO: There is some cutting off of code in the beginning, but it's fine, fix later
const AnimatedEditorWrapper = ({ fullCode }: any) => {
    return (
        <div
            style={{
                height: "20rem",
                width: "40rem",
                // WOHOOOO
                pointerEvents: "none"
            }}>
            <AnimatedEditor
                fullCode={fullCode} />
        </div>
    );
}

const AnimatedEditor = ({ fullCode }: { fullCode: string }) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    const [code, setCode] = useState("");

    useEffect(() => {
        let res: string = "";
        let idx = 0;

        const interval = setInterval(
            () => {
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
                    //editorRef.current?.getModel()?.setValue(res);
                    editorRef.current?.revealLine(
                        editorRef.current
                            .getModel()?.getLineCount() || 0);
                } else {
                    idx = 0;
                    res = "";
                }
            },
            50
        );

        return () => clearInterval(interval);
    }, []);

    return (<>
        <Editor
            theme="vs-dark"
            options={{
                fontSize: 17,
                readOnly: true,
                scrollbar: {
                    // TODO: Stop any interaction, no scrolling
                    // seems not working for vscodeEditor, maybe it has a parent above?
                    //alwaysConsumeMouseWheel: true
                }
            }}
            language="cpp"
            loading={<Spinner animation={"border"} />}
            onMount={
                (editor, monaco) => {
                    // WOW!!! very cool, but do it inside here only, as outside it is causing some CSS error, test this also in multiple browsers
                    editor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        function () { });
                    editorRef.current = editor; // doesnt matter before or after addCommand, prob because change is in place
                }
            }
            value={code}
        />
    </>);
};

export default AnimatedEditorWrapper;