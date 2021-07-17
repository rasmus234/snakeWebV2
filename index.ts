import {CanvasRenderingContext2D} from "canvas"
import 'reflect-metadata';

export const scoresPromise: Promise<Array<any>> = getScores()
import {getScores} from "./js/db"
import {Snake} from "./js/snake"
import {Food} from "./js/food"
import {Vec2D} from "./js/vec2D"
import {player} from "./js/player"
import {EatOthers, Powerup, Teleport, Warp} from "./js/powerup"
import {io, Socket} from "socket.io-client"
import {GameState} from "./js/gameState"
import {Entity} from "./js/entity"
import {Deserializer} from "./js/deserializer"

export const socket: Socket = io("http://localhost:5000")

socket.on("hiFromServer", (args) => console.log(args))
socket.on("newGameState", (gameStateJson:GameState) =>{
    startMultiplayerGame(gameStateJson)
} )
socket.on("gameOver", () => {
    console.log("recieved gameover")
    gameState.snakes.forEach(value => value.kill())
})
document.addEventListener("keydown", ev =>{
    let key = ev.key
    if (key == "s"||key == "a"||key == "d"||key == "w"||key == "ArrowUp"||key == "ArrowDown"||key == "ArrowLeft"||key == "ArrowRight")
    socket.emit("newDirection",ev.key)
})

console.log(socket.id)

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const gameboard = canvas.getContext("2d") as CanvasRenderingContext2D

const gameScreen = document.getElementById("gameScreen")
const initialScreen = document.getElementById("initialScreen")
const createNewGameButton = document.getElementById("newGameButton")
const joinGameButton = document.getElementById("joinGameButton")

// let usernameField = document.getElementById("go") as HTMLInputElement;
// const localStorage = window.localStorage;
// let usernameFromStorage: string = localStorage.getItem("username");
// usernameField.value = usernameFromStorage

const size: number = 1600
canvas.width = size
canvas.height = (size / 2)
export const canvasDimension: Vec2D = new Vec2D(canvas.width, canvas.height)
export const tileWidth = 20, tileHeight = 20

export let snakes: Snake[]
export let powerups: Powerup[]
export let foods: Food[]
export let entityLocations: Vec2D[] = []
let snake1: Snake
let snake2: Snake
export let entities: Entity[]
export let username
export let gameState: GameState

initLeaderboard()
createNewGameButton.addEventListener("mousedown", ev => {
    console.log("button clicked")
    socket.emit("newGameRequest",1)

})

function startMultiplayerGame(gameState: GameState) {
    const gameStateParsed: GameState = Deserializer.deserialize(gameState)
    gameState = gameStateParsed

    snakes = gameStateParsed.snakes
    entities = gameStateParsed.entities
    entityLocations = gameStateParsed.entityLocations
    foods = gameStateParsed.foods
    powerups = gameStateParsed.powerups
    snake1 = snakes[0]

    username = "test"
    initialScreen.style.display = "none"
    gameScreen.style.display = "block"
    draw()
}

function initVariables(players: number, username: string) {
    snake1 = new Snake(player.PLAYER1, new Vec2D(40, 6), new Vec2D(51, 6), new Vec2D(52, 6))
    snakes = [snake1]
    if (players == 2) {
        snake2 = new Snake(player.PLAYER2, new Vec2D(30, 6), new Vec2D(11, 6), new Vec2D(12, 6))
        snakes.push(snake2)
    }

    powerups = [new Warp(), new Teleport()]
    if (players == 2) {
        powerups.push(new EatOthers())
    }

    foods = Food.foodArray(30)
    entities = [...snakes, ...foods, ...powerups]
    entityLocations = [
        ...foods.map(value => value.location),
        ...powerups.map(value => value.location)]
    const musicElement = document.getElementById("music") as HTMLAudioElement
    musicElement.play()
    musicElement.volume = 0.2
    musicElement.loop = true
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

async function initLeaderboard() {
    const leaderboardTable = document.getElementById("leaderboardTable") as HTMLTableElement
    const scores: Array<any> = await scoresPromise
    scores.forEach((value, index) => {
        index++
        const username: string = value.username
        const score: number = value.score
        const date: Date = new Date(value.date)
        const row: HTMLTableRowElement = leaderboardTable.insertRow(index)
        const indexRow = row.insertCell(0)
        const userRow = row.insertCell(1)
        const dateRow = row.insertCell(2)
        const scoreRow = row.insertCell(3)
        indexRow.innerHTML = (index).toString()
        userRow.innerHTML = username
        dateRow.innerHTML = date.toLocaleDateString() + "-" + date.getHours().toString() + ":" + date.getMinutes().toString()
        scoreRow.innerHTML = score.toString().fontcolor("green")

    })

}






