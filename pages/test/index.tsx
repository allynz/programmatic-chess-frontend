import type { NextPage } from 'next';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import {
    HorizontalPageSplit,
    HorizontalPageSplitDividerProps,
    usePageSplitDivider
} from 'react-page-split';
import 'react-page-split/style.css';
import styles from '../styles/Divider.module.css';

const Test: NextPage = () => {
    return (<>
        <RealDivider />
    </>)
}

const RealDivider = () => {
    return (<>
        <HorizontalPageSplit
            divider={CustomDividerReal}
            style={{
                height: "100vh",
                width: "100vw"
            }}>
            <div
                style={{
                    backgroundColor: "green",
                    minWidth: "30rem"
                }}>
                <div style={{ margin: "5rem", boxShadow: "0px 0px 1rem 1rem blue" }}>
                    33
                </div>
            </div>
            <div style={{ backgroundColor: "red" }} />
        </HorizontalPageSplit>
    </>);
};

function CustomDividerReal(props: HorizontalPageSplitDividerProps<HTMLDivElement>) {
    //console.log(props);
    const { index } = props;

    const {
        className: classNameProp,
        children,
        ...rest
    } = usePageSplitDivider(props);

    const classNames = `custom-divider ${classNameProp} ${styles.divider}`;

    return (
        <div
            className={classNames}
            {...rest}>
            <button>
                <ArrowRight />
            </button>
            <div style={{
                height: "1rem",
                width: "10px",
                marginTop: "1rem",
                marginBottom: "1rem",
                borderLeft: "1px dashed grey",
                borderRight: "1px dashed grey"
            }} />
            <button>
                <ArrowLeft />
            </button>
        </div>
    );
}

export default Test