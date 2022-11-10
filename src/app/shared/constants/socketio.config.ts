import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "../../../environments/environment";

export const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    query: { gameId: null },
    reconnection: false,
    autoConnect: false
  }
};
