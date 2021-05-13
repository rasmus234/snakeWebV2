import {Vec2D} from "./vec2D";
import {Drawable} from "./Drawable";
import {canvasDimension, tileWidth, tileHeight, snakes} from "./main";
import {Snake} from "./snake";
import {Entity} from "./entity";

export class Food implements Entity {
    food: Vec2D
    color = "#fdc601";

    constructor() {
        this.setRandomLocation()
    }

    draw(gameboard: CanvasRenderingContext2D) {
        gameboard.fillStyle = this.color
        gameboard.strokeStyle = "black"
        gameboard.fillRect(this.food.x * tileWidth, this.food.y * tileHeight, tileWidth, tileHeight)
        gameboard.strokeRect(this.food.x * tileWidth, this.food.y * tileHeight, tileWidth, tileHeight)
    }

    update() {

        snakes.forEach(snake => {
            let snakeHead = snake.snakeParts[0]
            let snakeOnFood = (snakeHead.x === this.food.x && snakeHead.y === this.food.y)
            if (snakeOnFood) {
                snake.addSegment()
                snake.speed += 3
                this.setRandomLocation()
            }
        });

    }

    setRandomLocation() {
        let x = Math.floor(Math.random() * (canvasDimension.x / tileWidth));
        let y = Math.floor(Math.random() * (canvasDimension.y / tileHeight));
        this.food = {x: x, y: y}
    }

}


