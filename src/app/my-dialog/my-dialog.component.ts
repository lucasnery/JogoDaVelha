import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  app: AppComponent;
  dialog: boolean;
  characters: {
    name: string;
  }

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  sendCharacter(){

  }

}
