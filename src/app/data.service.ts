import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {MarvelHero} from './entity/marvelHeroe';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  publicKey = '6b8d5326918f11cefd7fee52630ef7b0';
  privateKey = '5d291be2447c3d053d2825f22b7bb54a8a666e1a';
  timeStamp = Date.now().toString();
  hash = Md5.hashStr(this.timeStamp + this.privateKey + this.publicKey);
  url = `https://gateway.marvel.com:443/v1/public/characters?ts=${this.timeStamp}&apikey=6b8d5326918f11cefd7fee52630ef7b0&hash=${this.hash}&name=`;

  constructor(private http: HttpClient) {
    console.log(this.hash);
  }

  getCharacter(name: string) {
    return this.http.get<Array<MarvelHero>>(`${this.url}${name}`).pipe(map((res: any) => res.data.results));
  }
}
