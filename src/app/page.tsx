import Image from "next/image";
import styles from "./page.module.css";
import Planets from "@/app/components/planets";
export default async function Home() {
  return (
    <main className={styles.main}>
      <Planets />
    </main>
  );
}
