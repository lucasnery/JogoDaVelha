import {DataService} from './data.service';
import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ScreenType} from './enums/ScreenType';
import {HeroSelectComponent} from './modal/hero-select/hero-select.component';
import Swal from 'sweetalert2';
import {MarvelHero} from './entity/marvelHeroe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  screen: ScreenType = ScreenType.HOME;
  screenType = ScreenType;

  playerOne: MarvelHero;
  playerTwo: MarvelHero;
  grid: any = [];
  currentPlayer: number;
  turns = 0;
  highlight: any = [];
  playerOnePoint = 0;
  playerTwoPoint = 0;
  winner: number;


  constructor(private dataService: DataService, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  choose(lineIndex: number, gridIndex: number) {
    const cell = this.grid[lineIndex][gridIndex];

    if (this.winner) {
      return false;
    }

    if (cell !== null) {
      return;
    }

    this.turns += 1;

    this.grid[lineIndex][gridIndex] = this.turns % 2 === 1 ? 'X' : 'O';

    if (this.checkWin()) {
      this.winner = this.currentPlayer;
      Swal.fire('Good game', `Player ${this.winner === 1 ? this.playerOne.name : this.playerTwo.name} has won!`, 'success');
      if (this.winner === 1) {
        this.playerOnePoint++;
      } else {
        this.playerTwoPoint++;
      }
      return;
    } else if (this.turns === 9) {
      Swal.fire('Draw', `No one wins!`, 'info');
      this.winner = -1;
      return;
    }

    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;

  }

  checkWin(): boolean {
    const possibilities = [

      // Horizontal
      [
        [0, 0],
        [0, 1],
        [0, 2]
      ],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],

      // Vertical
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],

      // Diagonal
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
    let win = false;
    possibilities.forEach(possibility => {
      const columnA = possibility[0];
      const cellA = this.grid[columnA[0]][columnA[1]];
      const columnB = possibility[1];
      const cellB = this.grid[columnB[0]][columnB[1]];
      const columnC = possibility[2];
      const cellC = this.grid[columnC[0]][columnC[1]];
      if (this.checkPossibility(cellA, cellB, cellC)) {
        win = true;
        this.highlight = [columnA.join(''), columnB.join(''), columnC.join('')];
        return false;
      }
    });
    return win;
  }

  checkPossibility(a, b, c): boolean {
    return a !== null && b !== null && a === b && b === c;
  }

  startGame() {
    this.screen = ScreenType.GAME;
    this.currentPlayer = ((parseFloat(String(Math.random() * 100)).toFixed(0) % 2) + 1);

    this.winner = null;
    this.grid = [
      [null, null, null], [null, null, null], [null, null, null]
    ];
    this.turns = 0;
  }

  restart() {
    this.screen = ScreenType.HOME;
    this.playerOne = null;
    this.playerTwo = null;
    this.currentPlayer = null;
    this.playerOnePoint = 0;
    this.playerTwoPoint = 0;
  }

  get fullImagePlayerOne(): string {
    return `${this.playerOne.thumbnail.path}.${this.playerOne.thumbnail.extension}`;
  }

  get fullImagePlayerTwo(): string {
    return `${this.playerTwo.thumbnail.path}.${this.playerTwo.thumbnail.extension}`;
  }

  pickPlayer(n: number) {
    this.modalService.open(HeroSelectComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (n === 1) {
        this.playerOne = result;
      } else if (n === 2) {
        this.playerTwo = result;
      }
    }, (reason) => {
      if (reason !== 0) {
        Swal.fire('Ops...', 'This shouldn\'t have happened. Please, try again!', 'error');
      }
    });
  }

}
