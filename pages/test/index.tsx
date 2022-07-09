import type { NextPage } from 'next';
import 'react-page-split/style.css';
import { RightButtonDivider } from '../../components/divider/buttons';

const Test: NextPage = () => {

    return (<>
        <div
            style={{
                margin: "10rem"
            }}>
            <RightButtonDivider
                onClick={() => { }} />
        </div>
    </>)
}

export default Test