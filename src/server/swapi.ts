"use server"
import { removeEmptyStringObject } from '@/util/helper';
import { IPlanet, IList, planetSearchParams } from '@/util/models'

const BASE_SWAPI_URL = 'https://swapi.dev/api'
const BASE_SWAPI_PLANET_URL = `${BASE_SWAPI_URL}/planets`

export async function getPlanets(params: planetSearchParams): Promise<IList<IPlanet>> {
  const clearParams = removeEmptyStringObject(params);
  const searchParams = new URLSearchParams(clearParams); 
  const url = (searchParams.size) ? `${BASE_SWAPI_PLANET_URL}?${searchParams.toString()}` : BASE_SWAPI_PLANET_URL
  const planets = await fetch(url)
  return planets.json()
}

export async function getPlanetById(id:string): Promise<IPlanet> { 
  const planet = await fetch(`${BASE_SWAPI_PLANET_URL}/${id}`)
  return planet.json();
}