import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";

// https://stackoverflow.com/questions/53900950/tabs-in-monaco-editor - useful if want to view submission in the same place
const VSCodeEditor = ({ updateSubmissionCode }: any) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    return (<>
        <Editor
            theme="vs-dark"
            options={{ fontSize: 20 }}
            language="cpp"
            onMount={
                (editor, monaco) => { editorRef.current = editor }
            }
            onChange={
                // read more about this, if it causes any performance issues, just get value from form itself
                // it was recommended in react lifting state up so used it
                // ahhh.... why can I not get it when I want it, would have to add more setstate for that to happen, see if you can make that pattern more easy across
                (code) => { updateSubmissionCode(code) }
            }
        />
    </>);
};

export default VSCodeEditor;