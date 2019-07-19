import { Character } from './character.model';
import { DataService } from './data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  characters = [];
  name: string;
  statusForm: boolean = true;
  character2: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(){
    this.getAllCharacters();
    this.statusForm = false;
  }

  getAllCharacters() {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
    console.log('Nome = ' + this.name);
    this.dataService.getCharacter(this.name).subscribe(
      res => {
        console.log('Tamanho = ' + res.data.results.length);
        for (let i = 0; i < res.data.results.length; i++) {
          console.log('Nome = ' + res.data.results[i].name);
          this.characters.push({
            id: res.data.results[i].id,
            name: res.data.results[i].name,
            image: res.data.results[i].thumbnail.path + '.' + res.data.results[i].thumbnail.extension
          })
        }

        console.log(this.characters);

      }
    )
  }
}
