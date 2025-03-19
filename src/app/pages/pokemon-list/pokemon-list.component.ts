import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterLink } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { loadPokemons } from '../../state/pokemons/pokemon.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { selectAllPokemons } from '../../state/pokemons/pokemon.selectors';
import { AppState } from '../../state/app.state';
@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    NzListModule,
    NzLayoutModule,
    RouterLink,
    NzGridModule,
    NzSkeletonModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  // pokemon = [
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 2,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 2,
  //     species: {
  //       name: 'ivysaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 3,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 3,
  //     species: {
  //       name: 'venusaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 4,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 4,
  //     species: {
  //       name: 'charmander',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
  //     },
  //     weight: 69,
  //   },
  //   {
  //     abilities: [
  //       {
  //         ability: {
  //           name: 'overgrow',
  //           url: 'https://pokeapi.co/api/v2/ability/65/',
  //         },
  //         is_hidden: false,
  //         slot: 1,
  //       },
  //       {
  //         ability: {
  //           name: 'chlorophyll',
  //           url: 'https://pokeapi.co/api/v2/ability/34/',
  //         },
  //         is_hidden: true,
  //         slot: 3,
  //       },
  //     ],
  //     height: 7,
  //     id: 1,
  //     moves: [
  //       {
  //         move: {
  //           name: 'razor-wind',
  //           url: 'https://pokeapi.co/api/v2/move/13/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'swords-dance',
  //           url: 'https://pokeapi.co/api/v2/move/14/',
  //         },
  //       },
  //       {
  //         move: {
  //           name: 'cut',
  //           url: 'https://pokeapi.co/api/v2/move/15/',
  //         },
  //       },
  //     ],
  //     name: 'bulbasaur',
  //     order: 1,
  //     species: {
  //       name: 'bulbasaur',
  //       url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
  //     },
  //     sprites: {
  //       front_default:
  //         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
  //     },
  //     weight: 69,
  //   },
  // ];
  // pokemons$: Observable<Pokemon[]>;
  dataSource: any = new Array(10).fill({}); // ! Alert !!!!!!!!!!!!!!!!!!
  loading = false;
  pokemons!: Pokemon[];

  constructor(private store: Store<AppState>) {
    this.store.select<Pokemon[]>(selectAllPokemons).subscribe((state) => {
      this.pokemons = [...state];
      this.loading = false;
    });
  }
  ngOnInit() {
    // this.dataSource = [...this.pokemon];
    this.store.dispatch(loadPokemons());
  }
}
