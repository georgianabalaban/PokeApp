import { Component, EventEmitter, Input, input, Output } from '@angular/core';

import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
    template: `
        <header class="relative flex flex-row items-start z-20">
            <nav
                class="z-20 flex flex-row bg-[#d71f06] p-[32px_64px_32px_30px] rounded-tl-[16px] rounded-br-[16px]"
                style="clip-path: polygon(100% 0, 100% 5rem, 6rem 100%, 0 100%, 0 0);"
            >
                <button
                    class="h-[60px] w-[60px] rounded-full border-4 border-white shadow-[0_0_8px_2px_rgba(0,0,0,0.1)] bg-[radial-gradient(#9af0ff,#12b2d6)]"
                ></button>
            </nav>

            <div class="absolute left-0 bottom-0 w-6 shadow-[4px_4px_8px_4px_rgba(0,0,0,0.5)] z-10"></div>

            <div
                class="flex flex-grow h-[80px] py-5 -ml-4 z-20 shadow-[32px_8px_8px_0_rgba(0,0,0,0.5)]"
                style="background: linear-gradient(133deg, rgba(215,31,6,1) 0%, rgba(215,31,6,1) 40%, rgba(226,88,70,1) 60%, rgba(215,31,6,1) 100%);"
            >
                <button
                    class="h-[12px] w-[12px] rounded-full mx-1 border border-[rgba(0,0,0,0.1)] bg-[radial-gradient(#da181f,#b90a0a)]"
                ></button>
                <button
                    class="h-[12px] w-[12px] rounded-full mx-1 border border-[rgba(0,0,0,0.1)] bg-[radial-gradient(#ffdc26,#f3b438)]"
                ></button>
                <button
                    class="h-[12px] w-[12px] rounded-full mx-1 border border-[rgba(0,0,0,0.1)] bg-[radial-gradient(#b0fb7b,#50fb05)]"
                ></button>
            </div>
        </header>

        <div class="flex flex-col flex-grow mt-[-48px] px-8 pb-8 bg-[#d71f06] rounded-bl-[32px]">
            <section
                class="flex flex-col flex-grow overflow-auto bg-black text-white p-[48px_8px_8px] shadow-[inset_0_-1px_2px_3px_grey] rounded-[32px] rounded-bl-[16px] rounded-tr-none"
            >
                @for (pokemon of pokemonList(); let index = $index; track pokemon.name) {
                    <app-pokemon-list-item [index]="$index" [pokemon]="pokemon" />
                }
            </section>

            <button
                class="mt-4 mx-auto bg-white text-black px-4 py-2 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
                (click)="loadMore.emit()"
                [disabled]="disabledLoadMore"
            >
                Load More
            </button>
        </div>

        <footer></footer>
    `,
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent],
})
export class PokemonListComponent {
    readonly pokemonList = input<SimplePokemon[]>([]);
    @Input() disabledLoadMore = false;
    @Output() loadMore = new EventEmitter<void>();
}
