"use client";
import { IPlanet } from "@/util/models";
import React from "react";
import style from "./planetCard.module.css";

export function PlanetCard({ planet }: { planet: IPlanet }) {
  const { name, diameter, climate, gravity } = planet;

  return (
    <div className={style.card}>
      nome {name}
      <br />
      diametro {diameter}
      <br />
      clima {climate}
      <br />
      gravidade {gravity}
    </div>
  );
}
