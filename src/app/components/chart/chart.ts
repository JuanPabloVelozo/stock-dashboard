import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IndexPrice } from '../../services/chart-data.service';

interface ChartPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './chart.html',
  styleUrls: ['./chart.scss']
})
export class Chart implements OnChanges {
  @Input() price?: IndexPrice;

  chartPoints: ChartPoint[] = [];
  svgPoints: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['price'] && this.price) {
      this.generateChartPoints();
    }
  }

  private generateChartPoints() {
    if (!this.price) return;

    this.chartPoints = [
      { x: 0, y: this.price.openPrice },
      { x: 1, y: this.price.minDay },
      { x: 2, y: this.price.maxDay },
      { x: 3, y: this.price.lastPrice },
      { x: 4, y: this.price.closePrice }
    ];

    const yValues = this.chartPoints.map(p => p.y);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    this.svgPoints = this.chartPoints
      .map(p => `${p.x * 50},${200 - ((p.y - minY) / (maxY - minY) * 200)}`)
      .join(' ');
  }
}
