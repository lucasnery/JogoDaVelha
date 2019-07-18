import { DataService } from './data.service';
import { Character } from './character.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  characters = [];

  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.getAllCharacters();
  }

  getAllCharacters(){
    this.dataService.getCharacter().subscribe(
      res => {
        console.log('Tamanho = ' + res.data.results.length);
        for(let i = 0; i < res.data.results.length; i++){
          if(res.data.results.length > 1){
            this.characters.push({
              id: res.data.results[i].id,
              name: res.data.results[i].name,
              image:  res.data.results[i].thumbnail.path + '.' + res.data.results[i].thumbnail.extension
            })
          }
        }

        console.log(this.characters);

      }
    )
  }
}
