import Image from "next/image";
import styles from "./page.module.css";
import { getPlanets } from "@/server/swapi";

export default async function Home() {
  const planets = await getPlanets();
  console.log(planets);
  return <main className={styles.main}></main>;
}
