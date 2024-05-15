import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { BoardComponent } from "../board/board.component";

@Component({
    selector: 'app-game',
    standalone: true,
    templateUrl: './game.component.html',
    styleUrl: './game.component.css',
    imports: [NavbarComponent, BoardComponent]
})
export class GameComponent {

}
