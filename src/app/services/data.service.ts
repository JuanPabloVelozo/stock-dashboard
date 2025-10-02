import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Modelo de instrumento
export interface Instrument {
  codeInstrument: string;
  name: string;
  shortName: string;
  pctDay: number;
  pct30D: number;
  pctCY: number;
  pct1Y: number;
  lastPrice: number;
  datetimeLastPrice: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  tend: string;
  performanceAbsolute: number;
  performanceRelative: number;
}

// Modelo de la respuesta JSON
export interface ConstituentListResponse {
  success: boolean;
  code: number;
  data: {
    info: {
      name: string;
      shortName: string;
      countryName: string;
      codeInstrument: string;
    };
    constituents: Instrument[];
  };
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly jsonUrl = 'constituyentes/constituensList.json';
  private cachedConstituents: Instrument[] | null = null;

  constructor(private http: HttpClient) { }

  // Ajuste: recibir tab opcional para filtrar instrumentos
  getConstituents(tab?: string): Observable<Instrument[]> {
    if (this.cachedConstituents) {
      return of(this.filterByTab(tab, this.cachedConstituents));
    }

    return this.http.get<ConstituentListResponse>(this.jsonUrl).pipe(
      map(response => {
        if (response.success && response.data.constituents) {
          this.cachedConstituents = response.data.constituents;
          return this.filterByTab(tab, this.cachedConstituents);
        } else {
          throw new Error('JSON inválido');
        }
      }),
      catchError(err => {
        console.error('Error al cargar JSON local:', err);
        return throwError(() => new Error('No se pudieron cargar los constituents'));
      })
    );
  }

  private filterByTab(tab: string | undefined, data: Instrument[]): Instrument[] {
    if (!tab) return data;
    return data.filter(inst => inst.codeInstrument === tab);
  }
}
