import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPokemon } from 'src/app/models/pokemon.interface';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnDestroy {
  private _pokeUrl: string = "";
  @Input() set pokeUrl(value: string) {
    this._pokeUrl = value;
    this.checkParams();
  };
  private _subscriptions: Subscription[] = [];
  private _id: number = -1;
  public pokemon: IPokemon | undefined;
  public error: string = "";
  public showBtn: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pokeapi: PokeapiService,
    private router: Router,
    ) {
    this._id = Number(this._activatedRoute.snapshot.paramMap.get("id"));
    if ((this._id === -1 || isNaN(this._id)) && !this.checkParams()) {
      this.error = "No parameter detected. Try to add one: 'localhost:4200/pokemon/6'. Or go to the list and chose one"
      this.showBtn = true;
    } else if (this._id > -1) {
      this.loadPokemon('id');
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkParams() {
    if (!this._pokeUrl) {
      this.error = 'No parameter detected.  Try to select a pokemon in the list';
      return false;
    } else {
      this.error = '';
      this.loadPokemon('url');
      return true;
    }
  }

  loadPokemon(origin: 'url' | 'id') {
    if (origin === 'url') {
      this._pokeapi.getPokemonInformationByUrl(this._pokeUrl).subscribe({
        next: res => {
          this.pokemon = {
            id: res.id,
            name: res.name,
            imageSrc: res.sprites.front_default,
            shiny: res.sprites.front_shiny,
            type: res.types.map((e: any) => e.type.name).join(',')
          }
        }
      })
    } else {
      this._pokeapi.getPokemonInformationById(this._id).subscribe({
        next: res => {
          this.pokemon = {
            id: res.id,
            name: res.name,
            imageSrc: res.sprites.front_default,
            shiny: res.sprites.front_shiny,
            type: res.types.map((e: any) => e.type.name).join(',')
          }
        }
      })
    }
  }

  redirectToList() {
    this.router.navigate(['list']);
  }
}
