import {Snake} from "./snake"
import {Food} from "./food"
import {Vec2D} from "./vec2D"
import {Drawable} from "./Drawable"
import {player} from "./player"
import {Entity} from "./entity"
import {EatOthers, Powerup, Warp} from "./powerup"
import {Image} from "canvas"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const gameboard: CanvasRenderingContext2D = canvas.getContext("2d")

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
entityLocations = [
    ...snakes.flatMap(value => value.snakeParts),
    ...foods.map(value => value.location),
    ...powerups.map(value => value.location)]


function draw() {
    gameboard.clearRect(0, 0, canvas.width, canvas.height)
    drawBoardGrid()
    entities.forEach(entity => entity.draw(gameboard))
    handleWarpPowerup()


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
function drawBoardGrid() {
    for (let i = 0; i < canvasDimension.y / tileHeight; i++) {
        const offset = i % 2 == 0 ? 0 : 1
        for (let j = 0; j < canvasDimension.x / tileWidth; j++) {
            gameboard.fillStyle = j % 2 == offset ? "#c2c2c2" : "#ccc"
            gameboard.fillRect(j * tileWidth, i * tileHeight, tileWidth, tileHeight)
        }
    }
}


function handleWarpPowerup() {
    //draw canvas outline of snake holding Warp powerup
    snakes.forEach(value => {
        if (value.activePowerups.some(powerup => powerup instanceof Warp)) {
            let currentPowerup: Warp = value.activePowerups.find(value1 => value1 instanceof Warp)
            gameboard.strokeStyle = value.color
            gameboard.lineWidth = currentPowerup.timeLeft / 500
            gameboard.strokeRect(0, 0, canvas.width, canvas.height)
            gameboard.lineWidth = 1
        }
    })
}


window.requestAnimationFrame(gameLoop)






