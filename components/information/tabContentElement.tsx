import { useRef } from 'react';
import {
    TabContent, TabPane
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
    const ref = useRef(null);

    if (ref && ref.current) {
        (ref.current as HTMLDivElement)?.scrollTo({ top: 0 })
    }

    return (<>
        <TabContent
            ref={ref}
            className={styles.content}>
            {
                dataMap.map(
                    (res: any) => {
                        return (
                            // apparently this doesnt scroll, it's parent does. By checking elem.scrollTop value, it is always 0 only.
                            // https://react-bootstrap.netlify.app/docs/components/tabs#tabcontent
                            // from the above link we can access onEnter etc. functions which expose elem variable
                            // also checking from console gives same result
                            <TabPane
                                key={res.key}
                                eventKey={res.key} >
                                {res.renderContent}
                            </TabPane>
                        );
                    })
            }
        </TabContent >
    </>);
};

export default TabContentElement;