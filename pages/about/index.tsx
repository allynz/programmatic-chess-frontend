import ReactMarkdownDisplay from '../../components/general/reactMarkdownDisplay';
import PageWrapNav from "../../components/navbar/pageWrapper";
import BACKEND from '../../configs/hostConfig';
import styles from './about.module.scss';

// Markdown TOC generator: https://ecotrust-canada.github.io/markdown-toc/
// manage spacing between elements, it seems off
const About = ({ markdownText, toc }: any) => {
    // prob. we can get TOC directly from that website API or make your own npm package - parse AST and generate tree, look at implementation of remark-toc
    return (<>
        <PageWrapNav>
            {/* See if I can highlight the required heading in TOC when on that while scrolling */}
            <div
                style={{
                    position: "sticky",
                    boxShadow: "4px 4px 5px -3px black",
                    top: "0",
                    maxWidth: "max-content",
                    backgroundColor: "rgb(71, 246, 255)",
                    padding: "2rem",
                    float: "left" // check other strategies, like flex/grid
                }}>
                <ReactMarkdownDisplay>
                    {toc}
                </ReactMarkdownDisplay>
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
                <ReactMarkdownDisplay>
                    {markdownText}
                </ReactMarkdownDisplay>

            </div>
        </PageWrapNav>
    </>);
};

export default About;

// can only use absolute URLs using `fetch` here
export async function getStaticProps() {
    const aboutPageText: string =
        await fetch(BACKEND + `/aboutPage`)
            .then(res => res.json());
    const aboutPageTableOfContents =
        await fetch(BACKEND + `/aboutPageTOC`)
            .then(res => res.json());

    // const markdownText =
    //     // seems I have to put it in public directory
    //     fs.readFileSync('public/aboutString.md', 'utf-8'); // See if utf-8 conflicts with any markdown syntax, prob. not

    return {
        props: {
            markdownText: aboutPageText,
            toc: aboutPageTableOfContents
        }
    }
}