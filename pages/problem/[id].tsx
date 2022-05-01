import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef } from "react";

// hmm, how is it detecting the query param if added in URL path - it is happening because of file structure. See if I can also limit access like this to the API itself
export default function Problem({ problem }: any) {

    const editorRef = useRef<editor.IStandaloneCodeEditor>();

    return (
        <>
            <div style={{
                // TODO: find a good fix for this 100% issue
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "aqua",
                overflow: "scroll"
            }}>
                <div style={{}}>
                    Problem id: {problem}
                </div>

                <div style={{ height: "100%", backgroundColor: "red" }}>
                    Strip
                </div>

                <div style={{ height: "40rem", width: "50rem", margin: "1rem" }}>
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

                        <label>
                            <Editor
                                theme="vs-dark"
                                options={{ fontSize: 20 }}
                                language="cpp"
                                onMount={(editor, monaco) => { editorRef.current = editor }} />
                        </label>

                        Problem: <input type="text" id="problemId" name="problemId"></input>
                        User: <input type="text" id="userId" name="userId"></input>

                        <button type="submit">SUBMIT</button>

                    </form>



                </div>

            </div>
        </>
    )
}

// export async function getServerSideProps({ params }: any) {

//     const req = await fetch(`http://localhost:8080/problem?id=${params.id}`); // TODO: watch out for any security issues here, while passing params
//     const data = await req.json();

//     return {
//         props: { problem: data }
//     }
// }

// also do getServerProps fallback if data not cached here
// TODO: see if this a good idea for IDE setting changes, as the pages are cached
// is it a good idea when accounts are there? Does it affect anything else other than the params use?
export async function getStaticProps({ params }: any) {

    const req = await fetch(`http://localhost:8080/problem?id=${params.id}`); // TODO: watch out for any security issues here, while passing params
    const data = await req.json();

    return {
        props: { problem: data }
    }
}

export async function getStaticPaths() {

    const req = await fetch("http://localhost:8080/problems");
    const data = await req.json(); // it's size should be reasonable enough that build times are less

    console.log(data);

    const paths = data.map((problem: number) => {
        return { params: { id: problem.toString() } }
    })

    return {
        paths,
        fallback: false
    }
}