import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private readonly BASE_PATH = `${environment.apiUrl}/players`;

  constructor(
    private http: HttpClient
  ) { }

  getPlayer(id: string): Promise<Player> {
    return firstValueFrom(this.http.get<Player>(`${this.BASE_PATH}/${id}`));
  }

  createPlayer(username: string, email: string, password: string): Promise<Player> {
    return firstValueFrom(this.http.post<Player>(this.BASE_PATH, { username, email, password }));
  }

  getPlayers(limit: number, offset: number): Promise<Player[]> {
    return firstValueFrom(this.http.get<Player[]>(`${this.BASE_PATH}`, { params: { limit, offset } }));
  }

  updatePlayerImage(image:File):Promise<void> {
    const formData = new FormData();
    formData.set('image', image);
    return firstValueFrom(this.http.put<void>(`${this.BASE_PATH}/images`, formData));
  }

  updatePlayer(username:string, email:string, password:string):Promise<Player> {
    return firstValueFrom(this.http.put<Player>(this.BASE_PATH, { username, email, password }));
  }
}
