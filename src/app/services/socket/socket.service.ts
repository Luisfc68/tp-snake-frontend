import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable()
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
    try {
      super.connect();
    } catch (e) {
      console.log('error',e)
    }

  }

}
