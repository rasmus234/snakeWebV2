import {Snake} from "./snake"
import {Food} from "./food"
import {Vec2D} from "./vec2D"
import {Drawable} from "./Drawable"
import {player} from "./player"
import {Entity} from "./entity"
import {EatOthers, Powerup, Warp} from "./powerup"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const context2D: CanvasRenderingContext2D = canvas.getContext("2d")


const size: number = 1600
canvas.width = size
canvas.height = size / 2
export const canvasDimension: Vec2D = new Vec2D(canvas.width, canvas.height)
export const tileWidth = 20, tileHeight = 20

export let snakes: Snake[]
export let powerups: Powerup[]
export let foods: Food[]
export let entityLocations: Vec2D[] = []

const snake1: Snake = new Snake(player.PLAYER1, new Vec2D(40, 6), new Vec2D(51, 6), new Vec2D(52, 6))
const snake2: Snake = new Snake(player.PLAYER2, new Vec2D(30, 6), new Vec2D(11, 6), new Vec2D(12, 6))
 snakes = [snake1, snake2]
 powerups = [new EatOthers(),new Warp()]
 foods = Food.foodArray(30)
export const entities: Entity[] = [...snakes, ...foods,...powerups]
entityLocations =  [
    ...snakes.flatMap(value => value.snakeParts),
    ...foods.map(value => value.location),
    ...powerups.map(value => value.location)]


function draw() {
    context2D.clearRect(0, 0, canvas.width, canvas.height)
    entities.forEach(entity => entity.draw(context2D))
}

function tick() {
    entities.forEach(entity => entity.update())
    draw()
}

let prevRenderTime: number

function gameLoop(currentTime: number) {
    window.requestAnimationFrame(gameLoop)
    const difference = (currentTime - prevRenderTime) / 1000
    if (difference < 1 / snake1.speed) return
    prevRenderTime = currentTime
    tick()
}

window.requestAnimationFrame(gameLoop)







