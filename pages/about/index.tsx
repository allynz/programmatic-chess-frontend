import ReactMarkdown from "react-markdown";
import PageWrapNav from "../../components/navbar/pageWrapper";

const About = () => {
    return (<>
        <PageWrapNav constrainToViewport stickyNav>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "20% 60% 20%",
                    paddingTop: "2rem",
                    paddingBottom: "2rem"
                }}>
                <br></br>
                <div>
                    <ReactMarkdown>
                        {aboutString}
                    </ReactMarkdown>
                </div>
                <br></br>
            </div>
        </PageWrapNav>
    </>);
};

export default About;

const aboutString: string = `
# Welcome to CodingChess

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


# Files

StackEdit stores your files in your browser, which means

## Create files and folders

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Switch to another file

## Interacting with Grader
Add endl to your print statements

## Platforms
Desktop - best viewed on 13 inch monitor
Browsers - all modern browsers

##Forum
Need a place where people can post and discuss errors/bugs etc. - Reddit/Twitlonger - see something that can be ported easily into your platform

## FAQ
Non-saved submissions are not saved, so submit
`;