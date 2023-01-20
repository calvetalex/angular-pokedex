import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPokemonList } from 'src/app/models/pokemon-list.interface';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnDestroy {
  private _subscriptions: Subscription[] = [];
  public pokemonList: IPokemonList = [];
  public pokemonUrl: string = "";
  
  constructor(private _pokeapi: PokeapiService) {
    this._subscriptions.push(this._pokeapi.getFirstGenerationList().subscribe({
      next: res => {
        this.pokemonList = [...res.results];
      },
      error: console.error,
      complete: console.log
    }));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClick(url: string) {
    console.log(url);
    this.pokemonUrl = url;
  }

}
