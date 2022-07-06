import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";

/* 
Div for editor code - non editable but can change size to a limit and usual editor change options- font, dark, etc.
scroll on any overflow above max size
Make better beforeMount, basically the loading screen
*/
const SubmissionCode = ({ code }: any) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    // Remove extra scroll lines as while viewing it's not needed
    // All options page: https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
    return (<>
        <Editor
            theme="vs-dark"
            options={{
                fontSize: 15,
                readOnly: true,
                scrollBeyondLastLine: false,
                scrollbar: {
                    // See if we can make this more smoother, scroll outside after certain more scrolls inside so that it is smoother, prob we cannot update it check docs: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IEditorScrollbarOptions.html 
                    // Back button on Mac can have problems as that auto detects back key on trackpad
                    //alwaysConsumeMouseWheel: false, // actually seems better when it consumes the whole mouse
                }
            }}
            language="cpp"
            onMount={
                (editor, monaco) => { editorRef.current = editor }
            }
            value={code}
        />
    </>);
};

export default SubmissionCode;