import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header/Header";
import ItemTypeButtons from "../components/ItemTypeButtons/itemTypeButtons";
// import styles from "../styles/Home.module.css";
import Map from "../components/map";
import SearchBar from "../components/SearchBar/searchbar";

const Home: NextPage = () => {
  return (
    <div className="space-y-2">
      <Header />
      <SearchBar />
      <ItemTypeButtons />
      <Map />
    </div>
  );
};

export default Home;
