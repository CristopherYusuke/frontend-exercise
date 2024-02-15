"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getPlanets } from "@/server/swapi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { planetSearchParams } from "@/util/models";
import { PlanetCard } from "./planetCard";
import style from "./planets.module.css";

export default function Planets() {
  const queryClient = useQueryClient();
  const [params, setParams] = useState<planetSearchParams>({
    page: "",
    search: "",
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["planets", params.page + params.search],
    queryFn: () => getPlanets(params),
  });

  useEffect(() => {
    if (data && (data?.next || data?.previous)) {
      queryClient.prefetchQuery({
        queryKey: ["planets", params.page + params.search],
        queryFn: () => getPlanets(params),
      });
    }
  }, [data, params, queryClient]);

  const handleOnClick = (page: string) => () => {
    const parseURL = new URL(page);
    const searchParams = new URLSearchParams(parseURL.search);
    setParams((prevState) => ({
      ...prevState,
      page: searchParams?.get("page")?.toString() || "",
    }));
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setParams(() => ({
      page: "",
      search: e?.target?.value,
    }));
  };

  return (
    <div>
      <label htmlFor="search"> Search : </label>
      <input
        id="search"
        className={style.searchInput}
        value={params.search}
        onChange={handleOnChangeSearch}
      />
      {isLoading ? (
        <p> loading ... </p>
      ) : (
        data && (
          <>
            <div className={style.cardList}>
              {data.results?.map((planet, index) => (
                <PlanetCard key={planet.name + index} planet={planet} />
              ))}
            </div>
            {!data.results ||
              (data.results.length === 0 && <p> no items found</p>)}
            {data.previous && (
              <button onClick={handleOnClick(data.previous)}>previous</button>
            )}
            {data.next && (
              <button onClick={handleOnClick(data.next)}>next</button>
            )}
          </>
        )
      )}
    </div>
  );
}
