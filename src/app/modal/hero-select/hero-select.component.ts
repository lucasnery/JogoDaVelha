import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../data.service';
import {MarvelHero} from '../../entity/marvelHeroe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css']
})
export class HeroSelectComponent implements OnInit {

  heroName: string;
  heroFound: MarvelHero;
  loading: boolean;
  error: boolean;
  temp: string;

  constructor(public activeModal: NgbActiveModal, private dataService: DataService) {
  }

  ngOnInit() {
  }

  clear() {
    this.heroFound = null;
    this.heroName = null;
  }

  goSearch(): void {
    if (!this.heroName) {
      Swal.fire('Ops...', 'Please, type the name of the hero first!', 'error');
    }
    this.loading = true;
    this.findHero(this.heroName);
  }

  get fullImage(): string {
    console.log(this.heroFound);
    return `${this.heroFound.thumbnail.path}.${this.heroFound.thumbnail.extension}`;
  }

  pickFile() {
    this.activeModal.close(this.heroFound);
  }

  findHero(name: string): void {
    this.dataService.getCharacter(name).subscribe(
      res => {
        console.log(res);
        this.heroFound = res[0];
        this.loading = false;
        if(!res.length){
          this.error = true;
        }else{
          this.error = false;
        }
      }, error => {
        Swal.fire('Ops...', 'This shouldn\'t have happened. Please, try again!', 'error');
        this.loading = false;
      }
    );
  }

}
