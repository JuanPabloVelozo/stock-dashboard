import { Component, Input } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IndexPrice } from '../../services/chart-data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, CardModule, PercentPipe],
  templateUrl: './summary.html',
  styleUrls: ['./summary.scss']
})
export class Summary {
  @Input() price?: IndexPrice;
}
