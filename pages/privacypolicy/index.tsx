import ReactMarkdownDisplay from "../../components/general/reactMarkdownDisplay";
import BACKEND from "../../configs/hostConfig";

const Page = ({ data }: any) => {
    return (
        <ReactMarkdownDisplay>
            {data}
        </ReactMarkdownDisplay>
    );
}

export default Page;

export async function getStaticProps() {
    const response = await fetch(BACKEND + '/privacypolicy');
    const data = await response.json();

    return {
        props: {
            data: data
        }
    }
}