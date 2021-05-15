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
export const canvasDimension: Vec2D = new Vec2D( canvas.width, canvas.height)
export const tileWidth = 20, tileHeight = 20;


const snake1: Snake = new Snake(player.PLAYER1, new Vec2D( 0, 6),new Vec2D( 1, 6),new Vec2D( 2, 6));
const snake2: Snake = new Snake(player.PLAYER2, new Vec2D( 10, 6),new Vec2D( 11, 6),new Vec2D( 12, 6))
export const snakes: Snake[] = [snake1, snake2]

const foods: Food[] = [new Food(), new Food(), new Food(), new Food()]
const entities: Entity[] = [...snakes, ...foods];
entities.forEach(console.log)

function draw() {
    context2D.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(entity => entity.draw(context2D))
}

function tick() {
    entities.forEach(entity => entity.update())
    draw()
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







