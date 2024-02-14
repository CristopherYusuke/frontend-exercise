"use server"


export async function getPlanets (){ 
  return await fetch(`https://swapi.dev/api/planets`)
}