import ReactMarkdown from "react-markdown";
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';

const ReactMarkdownDisplay = (props: any) => {
    // Make links more pronounced when viewing in makrkdown
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
            ]}>
            {props.children}
        </ReactMarkdown>
    );
};

export default ReactMarkdownDisplay;