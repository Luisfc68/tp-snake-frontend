import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService extends Socket {

  constructor(
    private storageService:StorageService
  ) {
    super({
      url: environment.socketUrl,
      options: {
        auth: { token: storageService.getAccessToken() },
        query: { gameId: null },
        reconnection: false,
        autoConnect: false
      }
    });
  }

  connectToGame(gameId:string) {
    this.ioSocket.io.opts.query.gameId = gameId;
    super.connect();
  }

  listenTo<T>(event:string):Observable<T>{
    return super.fromEvent(event);
  }

}
