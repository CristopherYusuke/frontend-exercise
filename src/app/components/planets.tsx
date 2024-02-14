"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getPlanets } from "@/server/swapi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { planetSearchParams } from "@/util/models";

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
  console.log(data, error);

  useEffect(() => {
    if (data && (data?.next || data?.previous)) {
      queryClient.prefetchQuery({
        queryKey: ["planets", params.page + params.search],
        queryFn: () => getPlanets(params),
      });
    }
  }, [data, params, queryClient]);

  const handleOnClick = (page: string) => () => {
    console.log(page);
    const parseURL = new URL(page);
    const searchParams = new URLSearchParams(parseURL.search);
    setParams((prevState) => ({
      ...prevState,
      page: searchParams?.get("page")?.toString() || "",
    }));
  };

  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setParams((prevState) => ({
      page: "",
      search: e?.target?.value,
    }));
  };

  return (
    <div>
      <h1> planets</h1>

      <input value={params.search} onChange={handleOnChangeSearch} />

      {isLoading ? (
        <p> loading ... </p>
      ) : (
        data && (
          <>
            <ul>
              {data?.results?.map((planets, index) => (
                <li key={planets.name + index}>{planets.name} </li>
              ))}
            </ul>
            {!data?.results ||
              (data.results.length < 0 && <p> no items found</p>)}
            {data?.previous && (
              <button onClick={handleOnClick(data.previous)}>previous</button>
            )}
            {data?.next && (
              <button onClick={handleOnClick(data.next)}>next</button>
            )}
            <p> {params.page}</p>
            <p> {params.search} </p>
          </>
        )
      )}
    </div>
  );
}
