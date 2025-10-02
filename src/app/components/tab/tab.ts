import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.html',
  styleUrls: ['./tab.scss']
})
export class Tab {
  tabs = ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL'];
  selectedTab = signal(this.tabs[0]);

  selectTab(tab: string) {
    this.selectedTab.set(tab);
  }
}

