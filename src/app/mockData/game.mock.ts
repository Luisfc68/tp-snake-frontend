import { Game } from '../interfaces/game.interface';
import { Player } from '../interfaces/player.interface';
import player from './player.mock'
const mockedGame: Game ={
    id:'1',
    players: [],
    owner: player,
    status: 'WAITING',
    maxReachedLevel:4
}

export default mockedGame;