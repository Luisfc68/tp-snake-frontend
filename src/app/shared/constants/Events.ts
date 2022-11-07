export const ServerEvents = {
  PLAYER_JOIN: 'playerJoin',
  PLAYER_LEFT: 'playerLeft',
  LEVEL_UP: 'levelUp',
  GAME_START: 'gameStart',
  MOVEMENTS: 'movements',
  FOOD_EATEN: 'foodEaten',
  FOOD_SPAWN: 'foodSpawn',
  DEATH: 'death',
  FINISHED: 'gameFinished'
}

export const ClientEvents = {
  PLAYER_CONFIRM: 'playerConfirm',
  PLAYER_UNCONFIRMED: 'playerUnconfirmed',
  INIT_GAME: 'initGame',
  CHANGE_DIRECTION: 'changeDirection'
}
