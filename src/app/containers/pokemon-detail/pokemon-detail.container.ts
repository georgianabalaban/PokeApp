import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TabContentComponent } from 'components/tab-content/tab-content.component';
import { TabGroupComponent } from 'components/tab-group/tab-group.component';
import { Pokedex } from 'pokeapi-js-wrapper';
import { firstValueFrom } from 'rxjs';
import { TabType } from 'types/pokemon-tabs.types';
import { Pokemon } from 'types/pokemon.type';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

@Component({
    selector: 'app-pokemon-detail',
    imports: [PokemonInfoComponent, CommonModule, TabGroupComponent, TabContentComponent],
    template: `
        <div class="w-full bg-black text-white h-60 p-2 rounded-md shadow-inner">
            @if (currentPokemonInfo.data(); as pokemonInfo) {
                <app-pokemon-info [pokemonInfo]="pokemonInfo" />
            }
        </div>

        <!-- 
            TODO: make these tabs do something 
            - Look at https://github.com/Gabb-c/pokenode-ts and use data (+ types) from one of these endpoints
            - Implement something like moves, abilities, stats, ... whatever you think is cool
            - Be creative, do something you like
        -->

        <app-tab-group
            [tabs]="['abilities', 'stats', 'moves']"
            [selectedTab]="selectedTab"
            (tabChange)="selectTab($event)"
        ></app-tab-group>

        <app-tab-content
            [selectedTab]="selectedTab"
            [abilities]="abilities"
            [stats]="stats"
            [moves]="moves"
        ></app-tab-content>
    `,
})
export class PokemonDetailContainer {
    private readonly httpClient = inject(HttpClient);
    private readonly route = inject(ActivatedRoute);
    readonly pokemonId = signal(this.route.snapshot.paramMap.get('pokemonId') ?? 'bulbasaur');
    private pokedex = new Pokedex();

    abilities: any[] = [];
    stats: any[] = [];
    moves: any[] = [];
    @Input() selectedTab: TabType = TabType.Abilities;
    readonly currentPokemonInfo = injectQuery(() => ({
        queryKey: ['pokemon', this.pokemonId()],
        queryFn: () =>
            // TODO: use https://github.com/PokeAPI/pokeapi-js-wrapper instead?
            firstValueFrom(this.httpClient.get<Pokemon>(`/api/v2/pokemon/${this.pokemonId()}`)),
    }));

    constructor() {
        injectTwHostClass(() => 'flex flex-col gap-4 p-5 pt-20');
        this.route.paramMap.subscribe((params) => {
            const id = params.get('pokemonId');
            if (id) {
                this.pokemonId.set(id);
                this.fetchPokemonDetails(id);
            }
        });
    }

    async fetchPokemonDetails(id: string) {
        try {
            const pokemon = await this.pokedex.getPokemonByName(id);
            this.fetchAdditionalInfo(pokemon);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    async fetchAdditionalInfo(pokemon: any) {
        // Fetch abilities
        const abilityPromises = pokemon.abilities.map((ability: any) =>
            this.pokedex.getAbilityByName(ability.ability.name),
        );
        const abilityResponses = await Promise.all(abilityPromises);
        this.abilities = abilityResponses.map((response: any) => ({
            name: response.name,
            description: response.effect_entries[0]?.short_effect ?? 'No description available.',
        }));

        // Fetch stats
        this.stats = pokemon.stats.map((stat: any) => ({
            stat: stat.stat,
            base_stat: stat.base_stat,
        }));

        // Fetch moves
        const movePromises = pokemon.moves.map((move: any) => this.pokedex.getMoveByName(move.move.name));
        const moveResponses = await Promise.all(movePromises);
        this.moves = moveResponses.map((move: any) => ({
            name: move.name,
        }));
    }

    selectTab(tab: TabType) {
        this.selectedTab = tab;
    }
}
