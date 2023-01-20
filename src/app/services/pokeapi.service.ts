import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  constructor(private _http: HttpClient) { }

  getFirstGenerationList(): Observable<any> {
    return this._http.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  }

  getPokemonInformationById(id: number): Observable<any> {
    return this._http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getPokemonInformationByUrl(url:string): Observable<any> {
    return this._http.get(url);
  }
}
