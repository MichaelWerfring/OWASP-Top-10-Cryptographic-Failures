import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() id: number | undefined;
  @Input() value: string | undefined;

  constructor() { }
}
