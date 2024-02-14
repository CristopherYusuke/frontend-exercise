"use server"
import { removeEmptyStringObject } from '@/util/helper';
import { IPlanet, IList, planetSearchParams } from '@/util/models'

const BASE_SWAPI_URL = 'https://swapi.dev/api'

export async function getPlanets(params: planetSearchParams): Promise<IList<IPlanet>> {
  const basePlanetsURL = `${BASE_SWAPI_URL}/planets`
  const clearParams = removeEmptyStringObject(params);
  const searchParams = new URLSearchParams(clearParams); 
  const url = (searchParams.size) ? `${basePlanetsURL}?${searchParams.toString()}` : basePlanetsURL
  const planets = await fetch(url)
  return planets.json()
}