import { TestBed } from '@angular/core/testing';
import { SocketService } from './socket.service';
import { SocketIoConfig, SocketIoModule, Socket } from 'ngx-socket-io';
import { StorageService } from '../storage/storage.service';
import { of } from 'rxjs';

const config: SocketIoConfig = {
  url: 'http://localhost:8080',
  options: {
    query: { gameId: null },
    reconnection: false,
    autoConnect: false
  }
};

describe('SocketService', () => {
  let service: SocketService;
  let storageService: jasmine.SpyObj<StorageService>;
  let socket: jasmine.SpyObj<Socket>;
  beforeEach(() => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getAccessToken']);
    const socketSpy = jasmine.createSpyObj('Socket', ['connect','fromEvent','emit','disconnect']);
    TestBed.configureTestingModule({
      
      imports:[SocketIoModule.forRoot({
        url: 'http://localhost:8080',
        options: {
          query: { gameId: null },
          reconnection: false,
          autoConnect: false
        }
      })],
      providers: [
        SocketService,
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: Socket, useValue: socketSpy },
      ],
    }).compileComponents();
    service = TestBed.inject(SocketService);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    socket = TestBed.inject(Socket) as jasmine.SpyObj<Socket>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should use method connect and access token', () => {
    socket.ioSocket = {
      io: {
        opts:{
          query:{
            
          }
        }
      }
    }
    storageService.getAccessToken.and.returnValue('example');
    socket.connect.and.callFake(()=> {});
    service.connectToGame('example');
    expect(storageService.getAccessToken).toHaveBeenCalled();
    expect(socket.connect).toHaveBeenCalled();
  });

  it('should use from event method', () => {
    socket.fromEvent.and.returnValue(of())
    service.listenTo('example');
    expect(socket.fromEvent).toHaveBeenCalled();
  });

  it('should use disconnect method', () => {
    socket.disconnect.and.callFake(()=> {});
    service.disconnect();
    expect(socket.disconnect).toHaveBeenCalled();
  });

  it('should use emit method', () => {
    socket.emit.and.callFake(()=> {});
    service.emit('example');
    expect(socket.emit).toHaveBeenCalled();
  });
  
});
