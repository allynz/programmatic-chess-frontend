import { useContext, useEffect, useState } from "react";
import {
    Col, TabContainer
} from 'react-bootstrap';
import UserContext from "../../contexts/UserContext";
import styles from './Information.module.scss';
import NavElement from "./navElement";
import TabContentElement from "./tabContentElement";

type Props = {
    problem: any,
    createDataMap: (s: any) => Array<{
        key: string,
        renderContent: JSX.Element
    }>,
    isSolved: boolean
}

// LATER: Fix problem type in Props. Fine for now, later do for all cases where it is used
const ProblemDisplay = ({ problem, createDataMap, isSolved }: Props) => {
    //console.log(isSolved);
    const user = useContext(UserContext);
    const dataMap = createDataMap(problem);
    const dataMapKeys = dataMap.map(data => data.key);

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
            {/* this is the actual container of things, see if <Col> can help out in any sizing */}
            <Col className={styles.container}>
                <NavElement
                    navKeys={dataMapKeys}
                    isSolved={isSolved} />
                <TabContentElement dataMap={dataMap} />
            </Col>
        </TabContainer>
    </>);
}

export default ProblemDisplay;