import ReactMarkdownDisplay from "../../components/general/reactMarkdownDisplay";
import BACKEND from "../../configs/hostConfig";

const Page = ({ data }: any) => {
    return (
        <div
            style={{
                padding: "5rem"
            }}>
            <ReactMarkdownDisplay>
                {data}
            </ReactMarkdownDisplay>
        </div>
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