import {
    TabContent,
    TabPane
} from 'react-bootstrap';
import styles from './Information.module.scss';

type Props = {
    dataMap: Array<{
        key: string,
        // if issues occur, try changing this to `any` type
        renderContent: JSX.Element
    }>;
}

const TabContentElement = ({ dataMap }: Props) => {
    return (<>
        <TabContent className={styles.content}>
            {
                dataMap.map(
                    (res: any) => (
                        <TabPane
                            key={res.key}
                            eventKey={res.key}>
                            {res.renderContent}
                        </TabPane>
                    ))
            }
        </TabContent>
    </>);
};

export default TabContentElement;