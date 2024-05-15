import { Component } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import { CellComponent } from '../cell/cell.component';

interface Cell {
  value: string;
  id: number;
}

@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrl: './board.component.css',
    imports: [CellComponent]
})
export class BoardComponent {
click() {
alert('click');
}
  cells: Cell[] = Array(9).fill({ value: '' });

  currentPlayer: 'X' | 'O' = 'X';

  constructor() { }

  ngOnInit(): void {
  }

  makeMove(cell: Cell): void {
    alert('makeMove:' + cell.id + ' ' + cell.value);
    if (!cell.value) {
      cell.value = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}
