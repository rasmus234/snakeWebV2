import "./Drawable"
import {canvasDimension, snakes, tileHeight, tileWidth} from "./main";
import {Vec2D} from "./vec2D";
import {getDirection} from "./input";
import {Drawable} from "./Drawable";
import {player} from "./player";
import {Entity} from "./entity";


export class Snake implements Entity {

    playerNumber: player
    speed = 10
    color = "cyan";
    snakeParts: Vec2D[]

    constructor(playerNumber: player, ...bodyParts: Vec2D[]) {
        this.playerNumber = playerNumber
        if (playerNumber == player.PLAYER2) this.color = "red";
        this.snakeParts = bodyParts
    }

    draw(gameboard: CanvasRenderingContext2D): void {

        gameboard.fillStyle = this.color
        gameboard.strokeStyle = "black"
        this.snakeParts.forEach(part => gameboard.strokeRect(part.x * tileWidth, part.y * tileHeight, tileWidth, tileHeight));
        this.snakeParts.forEach(part => gameboard.fillRect(part.x * tileWidth, part.y * tileHeight, tileWidth, tileHeight));
    }


    update(): void {
        this.move();
    }

    private move(): void {
        let currentHead: Vec2D = this.snakeParts[0];
        let newHead: Vec2D = new Vec2D(currentHead.x + getDirection(this.playerNumber).x,currentHead.y + getDirection(this.playerNumber).y)
        const otherSnakes: Snake[] = snakes.filter(snake => snake.playerNumber != this.playerNumber);
        const overlapOtherSnakes = this.checkOverlapOtherSnakes(otherSnakes, newHead);
        let overlapOfSelf = this.checkOverlap(newHead);
        let outBounds = this.checkBounds(newHead);
        if (outBounds || overlapOfSelf || overlapOtherSnakes) { // @ts-ignore
            window.location = "/"
            alert(this.color + " loses")
        }
        this.snakeParts.pop()
        this.snakeParts.unshift(newHead)
    }

    private checkOverlapOtherSnakes(otherSnakes: Snake[], newHead: Vec2D): boolean {
        let overlaps = false;
        otherSnakes.forEach(snake => {
            if (snake.snakeParts.some(snakePart => snakePart.isOn(newHead))) overlaps = true
        })
        return overlaps
    }

    private checkOverlap(newHead: Vec2D): boolean {
        let overlap = this.snakeParts.some(bodyPart => bodyPart.isOn(newHead))
        return overlap;
    }

    private checkBounds(newHead: Vec2D): boolean {
        let outBounds = newHead.x < 0 || newHead.x > canvasDimension.x / tileWidth || newHead.y < 0 || newHead.y >= canvasDimension.y / tileHeight;
        return outBounds;
    }

    public addSegment(): void {
        let tail: Vec2D = this.snakeParts[this.snakeParts.length - 1]
        this.snakeParts.push(tail)
    }
}

