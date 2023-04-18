import type { NextPage } from 'next';
import Image from "next/image";
import 'react-page-split/style.css';
import styles from '../../styles/Problem.module.scss';

const Test: NextPage = () => {

    return (
        <div
            style={{
                margin: "10rem"
            }}>
            <div className={styles.imageContainer}>
                <Image
                    src='/images/88888888.png'
                    alt="My Image"
                    width={"100%"}
                    height={"100%"}
                    objectFit='cover'
                    layout='responsive'
                />
            </div>
        </div>
    );
}

export default Test