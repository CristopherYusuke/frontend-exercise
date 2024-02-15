import Image from "next/image";
import style from "./ui.module.css";

export default function Logo() {
  return (
    <div className={`${style.logoWrapper}`}>
      <Image
        className={style.logo}
        priority
        width={200}
        height={100}
        src="/starwarslogo.png"
        alt="star wars logo"
      />
      <p className={style.imageSubTitle}> Planets </p>
    </div>
  );
}
