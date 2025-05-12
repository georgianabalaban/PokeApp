import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { TabType } from 'types/pokemon-tabs.types';

@Component({
    selector: 'app-tab-group',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="flex flex-row *:flex-auto gap-2">
        <button
            #tabButton
            *ngFor="let tab of tabs; let idx = index"
            class="p-2 rounded-md transition-colors"
            [ngClass]="{
                'bg-cyan-500 text-white': tab === selectedTab,
                'bg-cyan-300 hover:bg-cyan-400': tab !== selectedTab,
            }"
            (click)="onTabClick(tab)"
            [attr.aria-selected]="tab === selectedTab"
            role="tab"
            [attr.id]="'tab-' + idx"
            [attr.tabindex]="tab === selectedTab ? 0 : -1"
            (keydown)="onTabKeydown($event, idx)"
        >
            {{ tab | titlecase }}
        </button>
    </div>`,
})
export class TabGroupComponent {
    @Input() tabs: TabType[] = [TabType.Abilities, TabType.Stats, TabType.Moves];
    @Input() selectedTab: TabType = TabType.Abilities;
    @Output() tabChange = new EventEmitter<TabType>();
    @ViewChildren('tabButton') tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

    onTabClick(tab: TabType) {
        this.tabChange.emit(tab);
    }

    onTabKeydown(event: KeyboardEvent, index: number) {
        const keyMap: Record<string, number> = {
            ArrowRight: 1,
            ArrowDown: 1,
            ArrowLeft: -1,
            ArrowUp: -1,
        };

        const offset = keyMap[event.key];
        if (offset) {
            event.preventDefault();
            const newIndex = (index + offset + this.tabs.length) % this.tabs.length;
            this.selectTab(newIndex);
        }
    }
    selectTab(index: number) {
        this.selectedTab = this.tabs[index];
        this.tabChange.emit(this.selectedTab);
        const button = this.tabButtons.get(index);
        button?.nativeElement.focus();
    }
}
