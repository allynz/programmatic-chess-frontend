import ReactMarkdown from "react-markdown";
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import styles from '../../styles/markdown-styles.module.css';

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
    // Make links more pronounced when viewing in makrkdown
    const markdownString = displayString;
    return (
        // LATER: make this a custom render for all markdown
        <ReactMarkdown
            rehypePlugins={[
                rehypeRaw,
                rehypeAutoLinkHeadings,
                rehypeSlug
            ]}
            remarkPlugins={[
                remarkGfm,
                [remarkToc, { tight: true }]
            ]}
            className={styles.reactMarkdown}>
            {markdownString}
        </ReactMarkdown>
    );
};