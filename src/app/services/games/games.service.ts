import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Game } from '../../interfaces/game.interface';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly BASE_PATH = `${environment.apiUrl}/games`;

  constructor(
    private http:HttpClient
  ) {}

  getRooms(limit:number,offset:number):Promise<Game[]>{
    return firstValueFrom(this.http.get<Game[]>(`${this.BASE_PATH}`,{
      params: { limit: limit, offset: offset}
    }));
  }


}
