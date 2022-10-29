import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player.interface';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {


  private readonly BASE_PATH = `${environment.apiUrl}/players`;

  constructor(
    private http:HttpClient
  ) {}

  getPlayer(id:string):Promise<Player> {
    return firstValueFrom(this.http.get<Player>(`${this.BASE_PATH}/${id}`));
  }

  createPlayer(username:string, email:string, password:string):Promise<Player> {
    return firstValueFrom(this.http.post<Player>(this.BASE_PATH, { username, email, password }));
  }

  getPlayers(limit:number,offset:number):Observable<Player[]>{
    return this.http.get<Player[]>(`${this.BASE_PATH}`,{
      params: { limit: limit, offset: offset}
    });
  }
}
