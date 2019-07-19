import { DataService } from './data.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  chooseCharacter: boolean;
  characters = [];
  character1: string = 'Hulk';
  character2: string = 'Thor';
  game: boolean = true;

  constructor(private dataService: DataService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.start();
  }

  start() {
    this.getAllCharacters(this.character1);
    this.getAllCharacters(this.character2);
    console.log(this.characters);
    this.chooseCharacter = false;
    this.game = true;
  }

  openModal() {
    this.modalService.open(MyDialogComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.error(reason);
    });
  }

  getAllCharacters(name: string) {
    console.log('Nome = ' + name);

    this.dataService.getCharacter(name).subscribe(
      res => {

        console.log(res);
        console.log('Tamanho = ' + res.data.results.length);

        res.data.results.forEach(item => {
          console.log(item);
          console.log('Nome', item.name);
          this.characters.push({
            id: item.id,
            name: item.name,
            image: item.thumbnail.path + '.' + item.thumbnail.extension
          });
        });
        console.log(this.characters);
      }, error => {
        alert('Ops... it shouldn\'t have happened! Take care that you provided the right name for both characters!');
        console.error(error);
      }
    );
  }
}
