import Image from 'next/image';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import styles from './UserImage.module.scss';

// Can make a matrix style border but too much tinkering for now
export const UserImage = () => {
    const user = useContext(UserContext);

    if (!user) {
        return (<></>);
    }

    const defaultImage: string =
        "/images/photo-1562109245-d184fe2c81ff.avif"
    return (
        <div className={styles.outer}>
            <div className={styles.inner}>
                <Image
                    alt={`User Image`}
                    src={user?.photoURL || defaultImage}
                    width={"100%"}
                    height={"100%"}
                    layout="responsive"
                    objectFit="cover" />
            </div>
        </div>
    );
}