import fs from 'fs';
import ReactMarkdown from "react-markdown";
import rehypeAutoLinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import PageWrapNav from "../../components/navbar/pageWrapper";
import styles from './about.module.scss';

// Markdown TOC generator: https://ecotrust-canada.github.io/markdown-toc/
// manage spacing between elements, it seems off
const About = ({ markdownText }: any) => {
    // prob. we can get TOC directly from that website API or make your own npm package - parse AST and generate tree, look at implementation of remark-toc
    const mText = `
## Table Of Contents

- [About Coding Chess](#about-coding-chess)
- [Pages](#pages)
    * [Homepage](#homepage)
    * [Problems](#problems)
        + [Specific Problem Page](#specific-problem-page)
    * [My Submissions](#my-submissions)
        + [Submission Details Page](#submission-details-page)
    * [About Page](#about-page)
- [Submission Guidelines](#submission-guidelines)
    * [Interaction With Grader](#interaction-with-grader)
- [Misc](#misc)
    * [Helpful Snippets](#helpful-snippets)
    * [Platforms](#platforms)
    * [Data Security](#data-security)
- [FAQ](#faq)
- [Contact Details](#contact-details)
    `;

    return (<>
        <PageWrapNav>
            {/* See if I can highlight the required heading in TOC when on that while scrolling */}
            <div
                style={{
                    position: "sticky",
                    top: "0",
                    maxWidth: "max-content",
                    backgroundColor: "aqua",
                    padding: "2rem",
                    float: "left" // check other strategies, like flex/grid
                }}>
                <ReactMarkdown>
                    {mText}
                </ReactMarkdown>
            </div>
            <div
                className={styles.yo}
                style={{
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                    paddingLeft: "25%",
                    paddingRight: "20%"
                }}>
                {/* WHAT? https://stackoverflow.com/questions/33191744/how-to-add-new-line-in-markdown-presentation, make an auto plugin for this */}
                {/* CHECK: Adding numbered headings: https://talk.commonmark.org/t/heading-number-and-table-of-content-extension/3645, https://gist.github.com/patik/89ee6092c72a9e39950445c01598517a */}
                {/* Also see tabbed/indented headings if it's possible */}
                <ReactMarkdown
                    rehypePlugins={[
                        rehypeRaw,
                        rehypeAutoLinkHeadings,
                        rehypeSlug
                    ]}
                    remarkPlugins={[
                        remarkGfm,
                        [remarkToc, { tight: true }]
                    ]} >
                    {markdownText}
                </ReactMarkdown>

            </div>
        </PageWrapNav>
    </>);
};

export default About;

// can only use absolute URLs using `fetch` here
export async function getStaticProps() {
    const markdownText =
        // seems I have to put it in public directory
        fs.readFileSync('public/aboutString.md', 'utf-8'); // See if utf-8 conflicts with any markdown syntax, prob. not

    return {
        props: { markdownText: markdownText }
    }
}