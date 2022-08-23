import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { Spinner } from "react-bootstrap";

// There is a command palette already in editor with few customization functionalities, so when you add any customization, keep that in mind
const VSCodeEditor = ({ updateSubmissionCode, code, onEditorMount }: any) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    return (<>
        <Editor
            theme="vs-dark"
            options={{
                fontSize: 17,
                scrollbar: {
                    // seems not working for vscodeEditor, maybe it has a parent above?
                    alwaysConsumeMouseWheel: true
                }
            }}
            language="cpp"
            loading={<Spinner animation={"border"} />}
            onMount={
                (editor, monaco) => {
                    onEditorMount();
                    // WOW!!! very cool, but do it inside here only, as outside it is causing some CSS error, test this also in multiple browsers
                    editor.addCommand(
                        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
                        function () { });
                    editorRef.current = editor; // doesnt matter before or after addCommand, prob because change is in place
                }
            }
            onChange={
                // read more about this, if it causes any performance issues, just get value from form itself
                // it was recommended in react lifting state up so used it
                // ahhh.... why can I not get it when I want it, would have to add more setstate for that to happen, see if you can make that pattern more easy across
                (code) => { updateSubmissionCode(code) }
            }
            value={code}
        />
    </>);
};

export default VSCodeEditor;