import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-tab-group',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="flex flex-row *:flex-auto gap-2">
        <button
            *ngFor="let tab of tabs"
            class="p-2 rounded-md transition-colors"
            [ngClass]="{
                'bg-cyan-500 text-white': tab === selectedTab,
                'bg-cyan-300 hover:bg-cyan-400': tab !== selectedTab,
            }"
            (click)="onTabClick(tab)"
        >
            {{ tab | titlecase }}
        </button>
    </div>`,
})
export class TabGroupComponent {
    @Input() tabs: string[] = [];
    @Input() selectedTab: string = '';
    @Output() tabChange = new EventEmitter<string>();

    onTabClick(tab: string) {
        this.tabChange.emit(tab);
    }
}
