import {Snake} from "./snake";
import {Food} from "./food";
import {Vec2D} from "./vec2D";
import {Drawable} from "./Drawable";
import {player} from "./player";
import {Entity} from "./entity";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context2D: CanvasRenderingContext2D = canvas.getContext("2d")


const size: number = 1000
canvas.width = size
canvas.height = size / 2
export const canvasDimension: Vec2D = {x: canvas.width, y: canvas.height}
export const tileWidth = 20, tileHeight = 20;


const snake1: Snake = new Snake(player.PLAYER1, {x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 6})
const snake2: Snake = new Snake(player.PLAYER2, {x: 10, y: 6}, {x: 11, y: 6}, {x: 12, y: 6})
export const snakes: Snake[] = [snake1, snake2]

const foods: Food[] = [new Food(), new Food(), new Food(), new Food()]
const entities: Entity[] = [...snakes, ...foods];
entities.forEach(console.log)

function draw(board: CanvasRenderingContext2D) {
    board.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => entity.draw(context2D))
}

function tick() {
    entities.forEach(entity => entity.update())
    draw(context2D)
}

let prevRenderTime: number

function gameLoop(currentTime) {
    window.requestAnimationFrame(gameLoop)
    const difference = (currentTime - prevRenderTime) / 1000
    if (difference < 1 / snake1.speed) return
    prevRenderTime = currentTime
    tick()
}

window.requestAnimationFrame(gameLoop)







