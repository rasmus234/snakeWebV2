require("dotenv").config();
import {getScores, sendScore} from "./db"
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
let snake1: Snake
let snake2: Snake
export let entities
export let username

startScreen()

function initVariables(players: number, usernameParam: string) {
    username = usernameParam
    snake1 = new Snake(player.PLAYER1, new Vec2D(40, 6), new Vec2D(51, 6), new Vec2D(52, 6))
    snakes = [snake1]
    if (players == 2) {
        snake2 = new Snake(player.PLAYER2, new Vec2D(30, 6), new Vec2D(11, 6), new Vec2D(12, 6))
        snakes.push(snake2)
    }

    powerups = [new Warp()]
    if (players == 2) {
        powerups.push(new EatOthers())
    }

    foods = Food.foodArray(30)
    entities = [...snakes, ...foods, ...powerups]
    entityLocations = [
        ...snakes.flatMap(value => value.snakeParts),
        ...foods.map(value => value.location),
        ...powerups.map(value => value.location)]
    window.requestAnimationFrame(gameLoop)
}

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
export let currentFrame

function gameLoop(currentTime: number) {

    currentFrame = window.requestAnimationFrame(gameLoop)
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

let startScreenActive = true

async function drawLeaderboard() {
    let leaderboardOffset = 100
    let count = 1
    const scores: Array<any> = await getScores()
    scores.forEach(value => {
        const username: string = value.username
        const score: number = value.score
        const date: string = value.date
        gameboard.fillStyle = "black"
        gameboard.font = "25px Ariel"
        gameboard.fillText(String(count++), canvasDimension.x / 2 - 200, leaderboardOffset)
        gameboard.fillText(username, canvasDimension.x / 2 - 150, leaderboardOffset)
        gameboard.fillText(date.substr(0, 10), canvasDimension.x / 2 - 10, leaderboardOffset)
        gameboard.fillStyle = "green"
        gameboard.fillText(String(score), canvasDimension.x / 2 + 120, leaderboardOffset)
        leaderboardOffset += 25
    })
}

export async function startScreen() {
    await drawLeaderboard()


    let activeButton: number = 1
    gameboard.fillStyle = "black"
    gameboard.lineWidth = 2
    gameboard.strokeStyle = "green"
    const button1: Vec2D = new Vec2D(canvasDimension.x / 2 - 100, canvasDimension.y * 0.9)
    const button2: Vec2D = new Vec2D(canvasDimension.x / 2, canvasDimension.y * 0.9)
    gameboard.fillRect(button1.x, button1.y, 60, 50)
    gameboard.strokeRect(button1.x, button1.y, 60, 50)
    gameboard.fillRect(button2.x, button2.y, 60, 50)
    gameboard.fillStyle = "white"
    gameboard.font = "25px Ariel"
    gameboard.fillText("1", button1.x + 25, button1.y + 30)
    gameboard.fillText("2", button2.x + 25, button2.y + 30)

    window.addEventListener("keydown", ev => {
        if (startScreenActive == false) return

        if (ev.key == "ArrowLeft" || ev.key == "ArrowRight") {
            gameboard.fillStyle = "black"
            if (ev.key == "ArrowRight") {
                gameboard.strokeStyle = "#ccc"
                activeButton = 2
            } else gameboard.strokeStyle = "green"
            gameboard.fillRect(button1.x, button1.y, 60, 50)
            gameboard.strokeRect(button1.x, button1.y, 60, 50)
            gameboard.fillStyle = "white"
            gameboard.fillText("1", button1.x + 25, button1.y + 30)


            if (ev.key == "ArrowLeft") {
                gameboard.strokeStyle = "#ccc"
                activeButton = 1
            } else gameboard.strokeStyle = "green"
            gameboard.fillStyle = "black"
            gameboard.fillRect(button2.x, button2.y, 60, 50)
            gameboard.strokeRect(button2.x, button2.y, 60, 50)
            gameboard.fillStyle = "white"
            gameboard.fillText("2", button2.x + 25, button2.y + 30)
        }
        if (ev.key == "Enter") {
            startScreenActive = false
            let usernameField = document.getElementById("go") as HTMLInputElement
            let username = usernameField.value.substr(0,8)
            if (username =="") username = "Unknown"
            usernameField.remove()
            console.log(username)
            initVariables(activeButton, username)
        }
    })

}






