"use client";

import React from "react";
import style from "./details.module.css";
import { useQuery } from "@tanstack/react-query";
import { getPlanetById } from "@/server/swapi";
import { IPlanet } from "@/util/models";
import { useRouter } from "next/navigation";

export const fieldNormilize = (field: string) => {
  return field.replace("_", " ").replace(/(\w)(\w*)/g, function (g0, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
  });
};

export default function PlanetDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ["planet", params.id],
    queryFn: () => getPlanetById(params.id),
  });

  const filterFromObject = [
    "name",
    "url",
    "films",
    "residents",
    "created",
    "edited",
  ];

  return (
    <div className={style.planetDetails}>
      <div className={style.details}>
        {isLoading && <h1> loading </h1>}

        {data && (
          <section className={style.starWars}>
            <div className={style.title}>
              <p>{data.name}</p>
            </div>

            {Object.keys(data)
              .filter((field) => !filterFromObject.includes(field))
              .map((field, index) => {
                return (
                  <p key={index + field}>
                    {fieldNormilize(field)}:{" "}
                    {data[field as keyof IPlanet] as string}
                  </p>
                );
              })}
          </section>
        )}
      </div>
      <button
        type="button"
        className={style.button}
        onClick={() => router.back()}
      >
        back
      </button>
    </div>
  );
}
