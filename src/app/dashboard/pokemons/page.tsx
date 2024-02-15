import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";
import Image from "next/image";

const getPokemons = async( limit = 20, offset= 0 ):Promise<SimplePokemon[]> => {
    const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${ offset }`)
      .then( res => res.json() );
  
      const pokemons = data.results.map( pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name,
    }));

    //throw new Error('Esto es un error que no debería de suceder');
  
    return pokemons;
}     

export default async function PokemonsPage() {

    const pokemons = await getPokemons(151);

    return (
        <div className="m-2 flex flex-col">

            <span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>

            <div className="flex flex-wrap gap-10 items-center justify-center">

            {/* {
                pokemons.map( pokemon => (
                    <Image 
                        key={ pokemon.id }
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon.id }.svg`}
                        width={100}
                        height={100}
                        alt={ pokemon.name }
                        priority={ false }
                    />       
                ))
            } */}

            <PokemonGrid pokemons={pokemons} />
            </div>
      </div>
    );
}