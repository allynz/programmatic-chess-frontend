import ReactMarkdown from "react-markdown";
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeMathjax from 'rehype-mathjax';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';

const ReactMarkdownDisplay = (props: any) => {
    // Make links more pronounced when viewing in makrkdown
    return (
        // LATER: make this a custom render for all markdown
        <ReactMarkdown
            rehypePlugins={[
                rehypeRaw,
                rehypeAutoLinkHeadings,
                rehypeSlug,
                rehypeMathjax,
                // rehypeKatex needs the css to work, but the css messes up my own css, especially markdwon background, so used rehypeMathjax instead
                // rehypeKatex,
                // [rehypeDocument, { css: "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" }]
            ]}
            remarkPlugins={[
                remarkGfm,
                remarkMath,
                [remarkToc, { tight: true }]
            ]}>
            {props.children}
        </ReactMarkdown>
    );
};

export default ReactMarkdownDisplay;