import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Map from "../components/map";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Map />
    </div>
  );
};

export default Home;
