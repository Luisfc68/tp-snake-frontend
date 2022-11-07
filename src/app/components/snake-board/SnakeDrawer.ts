import { BoardPosition, Direction, SnakeData } from '../../interfaces/snake.interface';

export class SnakeDrawer {

  private canvas:HTMLCanvasElement;
  private ctx:CanvasRenderingContext2D;
  private _snakeColors?:Map<string, string>;
  private _boardSize?:number;
  private _currentFood?:BoardPosition;
  private cell = 10;
  private radius = 5;

  constructor(
    canvas:HTMLCanvasElement,
    snakeColors?:Map<string, string>,
    boardSize?:number
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this._boardSize = boardSize;
    this._snakeColors = snakeColors;
  }

  set boardSize(boardSize:number) {
    this.canvas.width = boardSize * this.cell;
    this.canvas.height = boardSize * this.cell;
    this._boardSize = boardSize * this.cell;
  }

  set snakeColors(snakeColors:Map<string, string>) {
    this._snakeColors = snakeColors;
  }

  reset() {
    if (this._boardSize) {
      this.ctx.clearRect(0, 0, this._boardSize, this._boardSize);
    }
  }

  set currentFood(currentFood:BoardPosition) {
    this.clearCurrentFood();
    this._currentFood = currentFood;
    this.drawCurrentFood();
  }

  drawCurrentFood() {
    if (this._currentFood && this._boardSize) {
      this.drawCircle(this._currentFood?.x, this._currentFood?.y, '#000000');
    }
  }

  clearCurrentFood() {
    if (this._currentFood && this._boardSize) {
      this.ctx.clearRect(
        this._currentFood?.x * this.cell,
        this._boardSize - this._currentFood?.y * this.cell,
        this.cell,
        this.cell
      );
    }
  }

  update(snakeData:SnakeData[]) {
    this.reset();
    this.drawCurrentFood();
    snakeData.forEach(snake => this.drawSnake(snake));
  }

  private drawCircle(x:number, y:number, color:string) {
    if (this._boardSize) {
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(
        x * this.cell + this.radius,
        this._boardSize - y * this.cell + this.radius,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  private drawSnake(snake: SnakeData) {
    const head:BoardPosition = snake.positions[0];
    const body:BoardPosition[] = snake.positions.slice(1);
    const color:string|undefined = this._snakeColors?.get(snake.player);
    if (color) {
      this.drawHead(head, color, snake.direction);
      body.forEach(bodyPart => this.drawCircle(bodyPart.x, bodyPart.y, color));
    }
  }

  private drawHead(head: BoardPosition, color:string, direction: Direction) {
    if (!this._boardSize) {
      return;
    }
    this.drawTongue(head, direction);
    //head
    this.drawCircle(head.x, head.y, color);
    this.drawEyes(head, direction);
  }

  private drawTongue(head: BoardPosition, direction: Direction) {
    if (!this._boardSize) {
      return;
    }
    this.ctx.fillStyle = '#EBB0CA';

    switch (direction) {
      case "LEFT":
        this.ctx.fillRect(
          head.x * this.cell - this.radius,
          this._boardSize - head.y * this.cell + this.radius,
          this.radius * 1.5,
          this.radius / 2
        );
        break;
      case "RIGHT":
        this.ctx.fillRect(
          head.x * this.cell + 1.4 * this.radius,
          this._boardSize - head.y * this.cell + this.radius,
          this.radius * 1.5,
          this.radius / 2
        );
        break;
      case "UP":
        this.ctx.fillStyle = '#EBB0CA';
        this.ctx.fillRect(
          head.x * this.cell + this.radius,
          this._boardSize - head.y * this.cell - this.radius,
          this.radius / 2,
          this.radius * 1.5
        );
        break;
      case "DOWN":
        this.ctx.fillStyle = '#EBB0CA';
        this.ctx.fillRect(
          head.x * this.cell + this.radius,
          this._boardSize - head.y * this.cell + 1.4 * this.radius,
          this.radius / 2,
          this.radius * 1.5
        );
        break;
    }
  }

  private drawEyes(head: BoardPosition, direction: Direction) {
    if (!this._boardSize) {
      return;
    }
    this.ctx.fillStyle = "#FFFFFF";

    switch (direction) {
      case "LEFT":
        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius + this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius - this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();
        break;
      case "RIGHT":
        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius * 1.5,
          this._boardSize - head.y * this.cell + this.radius + this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius * 1.5,
          this._boardSize - head.y * this.cell + this.radius - this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();
        break;
      case "UP":
        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius + this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius - this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius / 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();
        break;
      case "DOWN":
        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius + this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius * 1.5,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(
          head.x * this.cell + this.radius - this.radius / 1.5,
          this._boardSize - head.y * this.cell + this.radius * 1.5 ,
          this.radius / 2,
          0,
          2 * Math.PI,
          false
        );
        this.ctx.fill();
        this.ctx.stroke();
        break;
    }
  }
}
