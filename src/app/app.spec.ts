import { Component, signal } from '@angular/core';
import { Tab } from './components/tab/tab';
import { Header } from './components/header/header';
import { SearchBar } from './components/search-bar/search-bar';
import { InstrumentList } from './components/instrument-list/instrument-list';
import { Chart } from './components/chart/chart';
import { Summary } from './components/summary/summary';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Tab,
    Header,
    SearchBar,
    InstrumentList,
    Chart,
    Summary
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  // señal para el buscador
  searchTerm = signal('');

  // recibe el valor desde SearchBar
  onSearch(term: string) {
    this.searchTerm.set(term);
  }
}

