import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Instrument } from '../../services/data.service';

@Component({
  selector: 'app-instrument-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrument-item.html',
  styleUrls: ['./instrument-item.scss']
})
export class InstrumentItem implements OnChanges {
  @Input() instrument!: Instrument;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['instrument']) {
    }
  }
}


