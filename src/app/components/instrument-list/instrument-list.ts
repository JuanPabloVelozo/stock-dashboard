import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstrumentItem } from '../instrument-item/instrument-item';
import { DataService, Instrument } from '../../services/data.service';

@Component({
  selector: 'app-instrument-list',
  standalone: true,
  imports: [CommonModule, InstrumentItem],
  templateUrl: './instrument-list.html',
  styleUrls: ['./instrument-list.scss']
})
export class InstrumentList implements OnInit, OnChanges {
  @Input() searchTerm: string = ''; // Valor del buscador

  instruments: Instrument[] = [];          // Lista completa
  filteredInstruments: Instrument[] = [];  // Lista filtrada y visible

  private dataService = inject(DataService);

  ngOnInit() {
    // Cargar todos los instrumentos desde el servicio
    this.dataService.getConstituents().subscribe({
      next: (data) => {
        this.instruments = data;
        this.applyFilter(); // Aplicar filtro inicial
      },
      error: (err) => console.error('Error cargando instruments:', err)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // Si cambia searchTerm, actualizar la lista filtrada
    if (changes['searchTerm']) {
      this.applyFilter();
    }
  }

  // Filtrar la lista según lo escrito en el buscador
  private applyFilter() {
    if (!this.instruments.length) return;

    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.filteredInstruments = [...this.instruments];
    } else {
      this.filteredInstruments = this.instruments.filter(i =>
        i.name.toLowerCase().includes(term) || i.codeInstrument.toLowerCase().includes(term)
      );
    }
  }

  // Ordenar la lista filtrada alfabéticamente por nombre
  sortByName() {
    this.filteredInstruments.sort((a, b) =>
      a.codeInstrument.toLowerCase().localeCompare(b.codeInstrument.toLowerCase())
    );
  }

}
