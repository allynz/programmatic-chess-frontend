import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";

// TODO: Add no effect on pressing save, it is pretty annoying
// Add more adjustment options to the editor
// Add custom test option also in the ide
// TODO: Add run custom test feature
function EditorForm(props: any) {
    const { problemId, userId } = props;

    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    return (<>
        <div style={{ height: "100%", width: "auto", margin: "1rem" }}>
            {/*
                    Use direct dependency later on rather than react one, font size changes etc. we need, also it has dep issues
                    Also add fontsize and language change, theme change options
                    See if you can add more advanced customisation options like vscode, but be careful it should only affect the display, nothing like save actions etc.
                    Add a save action also in the editor - like save hotkey should not save the webpage but do nothing I guess
                    */}

            <form onSubmit=
                {async (e) => {
                    e.preventDefault();
                    console.log(e);
                    console.log(editorRef.current?.getValue());

                    var formData = new FormData();
                    var coddd = editorRef.current!.getValue();
                    formData.append('code', coddd);
                    formData.append('userId', e.target.userId.value);
                    formData.append('problemId', e.target.problemId.value);

                    const res = await fetch(
                        'http://localhost:8080/submitCode',
                        {
                            body: formData,
                            method: 'POST'
                        }
                    );

                    console.log(res);
                }}
                style={{ height: "100%", width: "100%" }}>

                {/* This font is nice, what is it? Also do these comments appear on browser? */}
                <div>Current submissions remaining: 10</div>

                <div style={{ height: "40rem", width: "30rem" }}>
                    <Editor
                        theme="vs-dark"
                        options={{ fontSize: 20 }}
                        language="cpp"
                        onMount={(editor, monaco) => { editorRef.current = editor }} />
                </div>

                <input
                    type="hidden"
                    id="problemId"
                    name="problemId"
                    value={problemId}></input>
                <input
                    type="hidden"
                    id="userId"
                    name="userId"
                    value={userId}></input>

                <button type="submit">SUBMIT</button>
                <div>Submission Status for current submission</div>

            </form>

        </div>

    </>)
}

export default EditorForm;