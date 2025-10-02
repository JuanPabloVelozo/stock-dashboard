import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { SearchBar } from './components/search-bar/search-bar';
import { Tab } from './components/tab/tab';
import { InstrumentList } from './components/instrument-list/instrument-list';
import { Chart } from './components/chart/chart';
import { Summary } from './components/summary/summary';
import { ChartDataService, IndexPrice } from './services/chart-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Header, SearchBar, Tab, InstrumentList, Chart, Summary],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  private chartService = inject(ChartDataService);

  searchTermValue = '';
  indexPrice?: IndexPrice;

  ngOnInit() {
    // Cargar índice principal (ejemplo: IPSA)
    this.chartService.getIndexData('IPSA').subscribe({
      next: (data: IndexPrice) => {
        this.indexPrice = data;
      },
      error: (err: any) => console.error('Error cargando índice:', err)
    });
  }

  onSearch(term: string) {
    this.searchTermValue = term;
  }

  searchTerm() {
    return this.searchTermValue;
  }
}
