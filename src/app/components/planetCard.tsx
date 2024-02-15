"use client";
import { IPlanet } from "@/util/models";
import React from "react";
import style from "./planetCard.module.css";
import { useRouter } from "next/navigation";
import planetDetails from "../planet/[id]/page";

export function PlanetCard(props: { planet: IPlanet }) {
  const {
    planet: { name, url },
  } = props;
  const router = useRouter();

  const handleOnClick = () => {
    const planetRoute = new URLSearchParams(new URL(url).search);
    console.log(planetRoute);
    const [planetId] = new URL(url).pathname.match(/([0-9]+)/) || [];

    router.push(`/planet/${planetId}`);
  };

  return (
    <div onClick={handleOnClick} className={style.card}>
      <p> {name} </p>
    </div>
  );
}
