import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Game, GameStatus } from '../../interfaces/game.interface';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private readonly BASE_PATH = `${environment.apiUrl}/games`;

  constructor(
    private http:HttpClient
  ) {}

  getRooms(limit:number, offset:number, status:GameStatus = 'WAITING'):Promise<Game[]>{
    return firstValueFrom(this.http.get<Game[]>(`${this.BASE_PATH}`,{
      params: {
        limit,
        offset,
        status
      }
    }));
  }

  createGame():Promise<Game> {
    return firstValueFrom(this.http.post<Game>(this.BASE_PATH, {}));
  }

  getGame(id:string):Promise<Game> {
    return firstValueFrom(this.http.get<Game>(`${this.BASE_PATH}/${id}`));
  }

}
