export interface IPokemonListItem {
    name: string;
    url: string;
}

export interface IPokemonList extends Array<IPokemonListItem>{}