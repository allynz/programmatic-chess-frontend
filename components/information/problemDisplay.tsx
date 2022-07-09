import { useContext, useEffect, useState } from "react";
import {
    Col, TabContainer
} from 'react-bootstrap';
import ReactMarkdown from "react-markdown";
import UserContext from "../../contexts/UserContext";
import PlaygroundBoard from "../chessboard/playground/board";
import { getSubmissionCollectionDataHook } from "../hooks/displayHooks";
import NavElement from "./navElement";
import TabContentElement from "./tabContentElement";

// TODO: Fix problem type in Props
function ProblemDisplay({ problem }: any) {
    const user = useContext(UserContext);
    const dataMap = getDataMap(problem);
    console.log("problem displayed again");

    const defaultActiveKey = dataMap.at(0)?.key;
    const [key, setKey] = useState(defaultActiveKey);

    useEffect(() => {
        if (!user && key === 'submissions') {
            setKey(defaultActiveKey);
        }
    }, [user]);

    // see better containers for this page, what about <Navbar> ?
    return (<>
        <TabContainer
            defaultActiveKey={defaultActiveKey}
            activeKey={key}
            onSelect={
                (currKey) => {
                    setKey(currKey || undefined);
                }
            }>
            <Col // this is the actual container of things, see if <Col> can help out in any sizing
                style={{
                    // important! to contain the div
                    height: "100%",
                    width: "auto",
                    // Kept visible for now to show nav visibility but if horizontal overflow occurs, we can clip to disable scrolling
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    padding: "1rem"
                }}>
                <NavElement navKeys={dataMap.map(v => v.key)} />
                <TabContentElement dataMap={dataMap} />
            </Col>
        </TabContainer>
    </>);
}

const getDataMap = (problem: any) => {
    const user = useContext(UserContext);

    // this hook should be present all the time since beginning of pageload, we only modify its params otherwise it causes errors
    // make sure this hook is initialised even when doing CSR in Nav, as we cannot add new hooks during runtime probably
    const submissionDataHook = getSubmissionCollectionDataHook(problem.id);
    const playground = (<>
        <p
            style={{
                textAlign: "center",
                width: "100%",
                fontWeight: "bold"
            }}>
            Chessboard for tinkering with the current problem
        </p>
        <PlaygroundBoard pieces={problem.pieces} />
    </>);

    const dataMap = [
        {
            key: "problem",
            renderContent: <ReactMarkdown>{problem.statement}</ReactMarkdown>
        },
        {
            key: "solution",
            renderContent: <ReactMarkdown>{problem.solution}</ReactMarkdown>
        },
        {
            key: "playground",
            renderContent: playground
        }
    ];

    if (user) {
        if (!dataMap.find(val => val.key === 'submissions')) {
            dataMap.splice(2, 0, {
                // maybe better key would be 'my submissions' as current key could be confused with all submissions by all users etc.
                // have a note in the body to clarify this, and hide unnecessary fields
                key: "submissions",
                renderContent: submissionDataHook // it does update even in const var, wow! Well const is differnt from Object.freeze
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

export default ProblemDisplay;