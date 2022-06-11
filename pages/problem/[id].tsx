import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import { Nav } from "react-bootstrap";
import EditorForm from "../../components/editorForm";
import ProblemDisplay from "../../components/problemDisplay";
import styles from '../../styles/Problem.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // seems we need to import on every page we need coz on loading directly, it doesn't seem to be injected

import {
    HorizontalPageSplit,
    VerticalPageSplit
} from 'react-page-split';
import 'react-page-split/style.css';

// hmm, how is it detecting the query param if added in URL path - it is happening because of file structure. See if I can also limit access like this to the API itself
export default function Problem({ problem }: any) {

    return (
        <>
            <div className={styles.nav}></div>
            <div style={{
                // TODO: find a good fix for this 100% issue
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                overflow: "clip" // resolve this
            }}>

                <HorizontalPageSplit style={{ overflow: "clip" }}>

                    <div style={{ overflow: "clip" }}>
                        <ProblemDisplay problem={problem} />
                    </div>

                    <EditorForm problemId={2} userId={1} />

                </HorizontalPageSplit>

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

    const data = await
        fetch(`http://localhost:8080/problem?id=${params.id}`)
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return {
                    id: 2,
                    statement: "Problem Statement",
                    solution: "Problem Solution"
                };
            }); // TODO: watch out for any security issues here, while passing params

    console.log(data);

    return {
        props: { problem: data }
    }
}

export async function getStaticPaths() {

    const reqDef = [1, 2, 3, 4, 5];

    const data = await
        fetch('http://localhost:8080/problems')
            .then(res => res.json())
            .catch(error => {
                //console.log(error);
                return [1, 2, 3, 4, 5];
            }); // it's size should be reasonable enough that build times are less

    console.log(data);

    const paths = data.map((problem: number) => {
        return { params: { id: problem.toString() } }
    })

    return {
        paths,
        fallback: false
    }
}