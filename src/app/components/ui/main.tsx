import React, { ReactNode } from "react";
import styles from "./main.module.css";
export default async function Main({ children }: { children: ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
