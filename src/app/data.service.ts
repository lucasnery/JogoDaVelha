import { Character } from './character.model';
import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public_key = '6b8d5326918f11cefd7fee52630ef7b0';
  private_key ='5d291be2447c3d053d2825f22b7bb54a8a666e1a';
  time_stamp = Date.now().toString();
  hash = Md5.hashStr(this.time_stamp + this.private_key + this.public_key);
  url = 'https://gateway.marvel.com:443/v1/public/characters?ts=' + this.time_stamp + '&apikey=6b8d5326918f11cefd7fee52630ef7b0&hash='+ this.hash;
  
  constructor(private _http : HttpClient) {
    console.log(this.hash);
  }

  getCharacter(){
    return this._http.get<any>(this.url).pipe(map((data: any) => data));
  }
}
