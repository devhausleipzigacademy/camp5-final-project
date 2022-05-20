import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Map from "../components/map";
import { useEffect, useState } from "react";
import { getMapData } from "../utils/getMapData";
import { MapData } from "../utils/types";

const Home: NextPage = () => {
  const [data, setData] = useState<MapData | null>(null);

  async function getAndSetMapData() {
    const mapData = await getMapData();
    setData(mapData);
  }
  useEffect(() => {
    getAndSetMapData();
  }, []);

  return <div className={styles.container}>{data && <Map data={data} />}</div>;
};

export default Home;
