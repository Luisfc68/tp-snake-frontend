import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private storageService:StorageService,
    private socket:Socket
  ) {}

  connectToGame(gameId:string) {
    this.socket.ioSocket.io.opts.query.gameId = gameId;
    this.socket.ioSocket['auth'] = {
      token: this.storageService.getAccessToken()
    };
    this.socket.connect();
  }

  listenTo<T>(event:string):Observable<T> {
    return this.socket.fromEvent(event);
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event:string, args?:any) {
    this.socket.emit(event, args);
  }
}
