import { User } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
    Col, TabContainer
} from 'react-bootstrap';
import ReactMarkdown from "react-markdown";
import { Piece } from "../../chess/types";
import UserContext from "../../contexts/UserContext";
import { getSubmissionCollectionDataHook } from "../../firebase/hook";
import PlaygroundBoard from "../chessboard/playground/board";
import NavElement from "./navElement";
import TabContentElement from "./tabContentElement";

// just for rendering, do not do any fetching here, just use params to render
// TODO: See typescript correct way to add typess
function ProblemDisplay({ problem, pieces }: any) {
    const user = useContext(UserContext);
    // see if we can make this a List<POJOModel> to assert type checks
    const dataMap = getDataMap(problem, pieces, user);

    const defaultActiveKey = dataMap.at(0)?.key;
    const [key, setKey] = useState(defaultActiveKey);

    // had to do this to get key back to start when user logged out when submission tab was active
    useEffect(() => {
        if (!user && key === 'submissions') {
            setKey("problem");
        }
    }, [user]);

    return (<> {/** should I put it unnecessarily? */}
        {/** Top level margins are put better here as I can adjust margins inside here, outside I don't know how much to put */}
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
                    height: "100%", // important! to contain the div
                    width: "auto",
                    overflow: "visible", /**Kept visible for now to show nav visibility but if horizontal overflow occurs, we can clip to disable scrolling */
                    //display: "flex", // flex is better than grid here as it auto sizes
                    //flexDirection: "column",
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

// converts JSOn automatically to required type in Array<piece>, good
const getDataMap = (problem: any, pieces: Array<Piece>, user: User | null) => {
    // this hook should be present all the time since beginning of pageload, we only modify its params
    // otherwise it causes errors
    // TODO: Improve this logic and dummy value
    // make sure this hook is initialised even when doing CSR in Nav, as we cannot add new hooks during runtime probably
    const submissionDataHook = getSubmissionCollectionDataHook(user?.uid || "dummy", problem.id);

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
            renderContent: (
                <>
                    Chessboard with tinkering opportunities
                    <PlaygroundBoard pieces={pieces} />
                </>)
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