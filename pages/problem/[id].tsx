import EditorDisplay from "../../components/editor/editorDisplay";
import ProblemDisplay from "../../components/information/problemDisplay";

import {
    HorizontalPageSplit
} from 'react-page-split';
import 'react-page-split/style.css';
import PageNav from "../../components/general/pageNav";

// hmm, how is it detecting the query param if added in URL path - it is happening because of file structure. See if I can also limit access like this to the API itself
export default function Problem({ problem }: any) {

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                // I'm thinking of using flex only since it autosizes based on content
                // display: "flex", // only thing with flex is gap control not there easily
                // flexDirection: "column",
                // justifyContent: "space-around"
                display: "grid",
                gap: "1%", // responsive doesnt fit well with this, sue maxHeight or something
                gridTemplateRows: "4% 95%", // hmm.... auto automatically resizes to 100% total with gap but not always(like in collection display) so better keep it static
                gridTemplateColumns: "100%"
            }}>

            <PageNav />

            <HorizontalPageSplit
                style={{
                    overflow: "clip",
                    height: "100%" // does this matter?
                }}>

                <div style={{ overflow: "clip", minWidth: "30%" }}>
                    <ProblemDisplay problem={problem} />
                </div>

                <div style={{ overflow: "clip", minWidth: "30%" }}>
                    <EditorDisplay problemId={2} userId={1} />
                </div>

            </HorizontalPageSplit>

        </div>
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