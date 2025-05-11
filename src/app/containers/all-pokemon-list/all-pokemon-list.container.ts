import { Component, signal } from '@angular/core';
import { PokemonService } from 'services/pokemon.service';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    template: `
        <app-pokemon-list [pokemonList]="pokemons()" (loadMore)="loadMorePokemons()" [disabledLoadMore]="isLoading" />
    `,
})
export class AllPokemonListContainer {
    offset = 0;
    limit = 20;
    pokemons = signal<SimplePokemon[]>([]);
    isLoading = false;
    constructor(private pokemonService: PokemonService) {
        this.fetchPokemons();
    }

    fetchPokemons() {
        this.isLoading = true;
        this.pokemonService.getPokemonList(this.limit, this.offset).subscribe((data) => {
            this.pokemons.update((prev) => [...prev, ...data.results]);
            this.offset += this.limit;
            this.isLoading = false;
            this.isLoading = false;
        });
    }

    loadMorePokemons() {
        this.fetchPokemons();
    }
}
