import { Injectable } from '@angular/core';
import { LoginResponse} from '../../interfaces/response/login.interface';
import { Player } from '../../interfaces/player.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly USER_KEY = 'USER_PROFILE';
  private readonly TOKENS_KEY = 'PLAYER_TOKENS';

  constructor() {}

  getTokensFromStorage():LoginResponse|null {
    const tokens:string|null = localStorage.getItem(this.TOKENS_KEY);
    if (!tokens) {
      return null;
    }
    return JSON.parse(tokens);
  }

  saveTokensOnStorage(tokens:LoginResponse) {
    localStorage.setItem(this.TOKENS_KEY, JSON.stringify(tokens));
  }

  saveUserOnStorage(user:Player) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUserFromStorage():Player|null {
    const user:string|null = localStorage.getItem(this.USER_KEY)
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  getAccessToken():string|undefined {
    return this.getTokensFromStorage()?.accessToken;
  }

  clearStorage() {
    localStorage.clear();
  }
}
