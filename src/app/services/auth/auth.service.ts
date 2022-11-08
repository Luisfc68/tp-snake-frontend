import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../interfaces/response/login.interface';
import { firstValueFrom } from 'rxjs';
import { Player } from '../../interfaces/player.interface';
import { PlayersService } from '../players/players.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_PATH = `${environment.apiUrl}/auth`;
  private http:HttpClient;

  constructor(
    private jwtHelper:JwtHelperService,
    private playerServices:PlayersService,
    private storageService:StorageService,
    private httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(httpBackend);
  }

  login(email:string, password:string):Promise<Player> {
    return firstValueFrom(this.http.post<LoginResponse>(this.BASE_PATH, { email, password }))
      .then(loginResponse => {
        this.storageService.saveTokensOnStorage(loginResponse);
        const { id } = this.jwtHelper.decodeToken(loginResponse.accessToken);
        return this.playerServices.getPlayer(id);
      })
      .then(player => {
        this.storageService.saveUserOnStorage(player);
        return player;
      });
  }

  refresh():Promise<LoginResponse> {
    const tokens:LoginResponse|null = this.storageService.getTokensFromStorage();
    if (!tokens) {
      return Promise.reject({ error: 'Not authenticated' });
    }
    const body = { refreshToken: tokens.refreshToken };
    return firstValueFrom(this.http.post<{accessToken:string}>(this.BASE_PATH + '/refresh', body))
      .then(response => {
        tokens.accessToken = response.accessToken;
        this.storageService.saveTokensOnStorage(tokens);
        return tokens;
      });
  }

}
