import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' // for bootstrap make sure styles are present in directory as with cdn, styles dont work if no internet connection, so all your content is splattered out
import Problem from './problem/[id]'
import Heading from '../components/heading'

// literally a flex grid this is!!
const Home: NextPage = () => {
  return (<>
    <Heading />
    <div>
      Wecome to App
    </div>
  </>)
}

export default Home
