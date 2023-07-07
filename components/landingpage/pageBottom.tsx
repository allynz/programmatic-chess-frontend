import styles from "../../styles/faq-styles.module.css";
import ReactMarkdownDisplay from "../general/reactMarkdownDisplay";

const PageBottom = ({ displayString }: any) => {
    return (<>
        <div
            style={{
                // can combine with top for padding but whatever, its fine now
                paddingLeft: "10%",
                paddingRight: "10%"
            }}>
            {/* Where to go from here - Links to other areas - problems, about page important infos */}
            {/* Quirky footer in the bottom */}
            <FAQ displayString={displayString} />
        </div>

    </>);
};

export default PageBottom;

const FAQ = ({ displayString }: any) => {
    return (
        <div
            className={styles.faq}>
            <ReactMarkdownDisplay>
                {displayString}
            </ReactMarkdownDisplay>
        </div>
    );
};