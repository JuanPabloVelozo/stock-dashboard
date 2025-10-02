import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Modelo completo según tu JSON
export interface IndexInfo {
  name: string;
  shortName: string;
  countryName: string;
  currencyName: string;
  currencySymbol: string;
  codeInstrument: string;
  marketName: string;
  hourOpen: string;
  hourClose: string;
  trading: boolean;
  exchangeRate: number;
}

export interface IndexPrice {
  lastPrice: number;
  datetimeLastPrice: string;
  openPrice: number;
  closePrice: number;
  datetimeClosePrice: string;
  performanceAbsolute: number;
  performanceRelative: number;
  bid: number;
  bidVolume: number;
  bidDatetime: string;
  ask: number;
  askVolume: number;
  askDatetime: string;
  volumeMoney: number;
  accumulatedVolumeMoney: number;
  volumeInstrument: number;
  accumulatedVolumeInstrument: number;
  tend: string;
  maxDay: number;
  minDay: number;
  min52W: number;
  max52W: number;
  pct30D: number;
  pctRelW52: number;
  pctRelCY: number;
}

// Respuesta completa
export interface IndexResponse {
  success: boolean;
  code: number;
  data: {
    info: IndexInfo;
    price: IndexPrice;
  };
}

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  private readonly folderUrl = 'resumen'; // Carpeta con varios JSON
  private cache: Record<string, IndexPrice> = {};

  constructor(private http: HttpClient) { }

  getIndexData(indexCode: string): Observable<IndexPrice> {
    if (this.cache[indexCode]) {
      return of(this.cache[indexCode]);
    }

    return this.http.get<IndexResponse>(`${this.folderUrl}/${indexCode}.json`).pipe(
      map(response => {
        if (response.success && response.data.price) {
          this.cache[indexCode] = response.data.price;
          return response.data.price;
        } else {
          throw new Error('JSON inválido');
        }
      }),
      catchError(err => {
        console.error(`Error cargando JSON de ${indexCode}:`, err);
        return throwError(() => new Error(`No se pudieron cargar los datos de ${indexCode}`));
      })
    );
  }
}
