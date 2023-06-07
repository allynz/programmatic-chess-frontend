import { useContext } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import UserContext from "../../contexts/UserContext";
import { Problem } from "../../types/global";
import PlaygroundBoard from "../chessboard/playground/boardWrapper";
import { MovesBoardWrapper } from "../submission/testCasesAccordion/singleAccordion";
import styles from "./styles.module.scss";
import SubmissionList from "./submissionList";

// should be a functional component or react hook, as it is using user data - which we can pass from caller if needed
export const useDataMap = (problem: Problem):
    // it is modifiable hence not readonly
    Array<{
        key: string,
        renderContent: JSX.Element
    }> => {
    const user = useContext(UserContext);

    // this hook should be present all the time since beginning of pageload, we only modify its params otherwise it causes errors
    // make sure this hook is initialised even when doing CSR in Nav, as we cannot add new hooks during runtime probably
    const submissionData = SubmissionList(problem.id);

    const dataMap = [
        {
            key: "problem",
            renderContent: (
                <div
                    style={{
                        borderRadius: "1rem",
                        padding: "1rem",
                        backgroundColor: "#f2f2f2"
                    }}
                    className={styles.yo}>
                    <ReactMarkdown
                        rehypePlugins={[
                            rehypeRaw,
                            rehypeAutoLinkHeadings,
                            rehypeSlug
                        ]}
                        remarkPlugins={[
                            remarkGfm,
                            [remarkToc, { tight: true }]
                        ]}>
                        {problem.statement}
                    </ReactMarkdown>
                    {
                        (problem.examples).map(
                            example => {
                                const element = document.getElementById(example.key);
                                if (element) element.className = 'example';

                                return element ?
                                    // css is not working somehow, so have to use inline styling. Try appendChild if external css is needed
                                    createPortal(
                                        <div key={example.key} style={{
                                            backgroundColor: "green",
                                            maxHeight: "15rem",
                                            maxWidth: "15rem",
                                            display: "grid",
                                            gridTemplateRows: "100%", // this is a saviour otherwise was not able to contain it
                                            gridTemplateColumns: "100%",
                                            overflow: "clip"
                                        }}>
                                            <MovesBoardWrapper
                                                input={example.input}
                                                output={example.output}
                                                boardString={example.board} />
                                        </div>,
                                        element
                                    ) :
                                    (<></>)
                            }
                        )
                    }
                </div>)
        },
        {
            key: "solution",
            renderContent: (
                <div
                    style={{
                        borderRadius: "1rem",
                        padding: "1rem",
                        backgroundColor: "#f2f2f2"
                    }}
                    className={styles.yo}>
                    <ReactMarkdown
                        rehypePlugins={[
                            rehypeRaw,
                            rehypeAutoLinkHeadings,
                            rehypeSlug
                        ]}
                        remarkPlugins={[
                            remarkGfm,
                            [remarkToc, { tight: true }]
                        ]}>
                        {problem.solution}
                    </ReactMarkdown>
                </div>
            )
        }
    ];

    if (problem.pieces && problem.pieces.length > 0) {
        dataMap.push(
            {
                key: "playground",
                renderContent:
                    <PlaygroundBoard
                        pieces={problem.pieces}
                        board={problem.randomValidBoards} />
            }
        );
    }

    // Test this in the end also
    if (user) {
        if (!dataMap.find(val => val.key === 'submissions')) {
            dataMap.splice(2, 0, {
                // maybe better key would be 'my submissions' as current key could be confused with all submissions by all users etc.
                // have a note in the body to clarify this, and hide unnecessary fields
                key: "submissions",
                renderContent: submissionData // it does update even in const var, wow! Well const is differnt from Object.freeze
            });
        }
    } else {
        const submissionsIndex = dataMap.findIndex(val => val.key === "submissions");
        if (submissionsIndex > -1) {
            dataMap.splice(submissionsIndex, 1);
        }
    }

    return dataMap;
}

