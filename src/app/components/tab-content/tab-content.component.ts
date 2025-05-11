import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonMove } from 'types/pokemon-move.type';
import { PokemonStat } from 'types/pokemon-stat.type';
import { PokemonAbility } from 'types/pokemon.ability.type';
@Component({
    selector: 'app-tab-content',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="grow bg-gray-200 p-2 rounded-md">
        <ng-container [ngSwitch]="selectedTab">
            <div *ngSwitchCase="'abilities'">
                <h3 class="text-lg font-semibold">Abilities</h3>
                <ul class="list-disc pl-4">
                    <li *ngFor="let ability of abilities">{{ ability.name }}: {{ ability.description }}</li>
                </ul>
            </div>

            <div *ngSwitchCase="'stats'">
                <h3 class="text-lg font-semibold">Stats</h3>
                <table class="w-full text-left border-collapse">
                    <tr *ngFor="let stat of stats">
                        <td class="py-1 pr-2 font-medium">{{ stat.stat.name }}</td>
                        <td class="py-1">{{ stat.base_stat }}</td>
                    </tr>
                </table>
            </div>

            <div *ngSwitchCase="'moves'">
                <h3 class="text-lg font-semibold">Moves</h3>
                <ul class="list-disc pl-4">
                    <li *ngFor="let move of moves">{{ move.name }}</li>
                </ul>
            </div>

            <div *ngSwitchDefault class="text-gray-500 italic">Select a tab to see details</div>
        </ng-container>
    </div> `,
})
export class TabContentComponent {
    @Input() selectedTab: string = '';
    @Input() abilities: PokemonAbility[] = [];
    @Input() stats: PokemonStat[] = [];
    @Input() moves: PokemonMove[] = [];
}
