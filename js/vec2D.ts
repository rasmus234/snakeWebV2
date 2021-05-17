import {canvasDimension, entityLocations, foods, powerups, snakes, tileHeight, tileWidth} from "./main"

export class Vec2D {
    x: number
    y: number


    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }


    public isOn?(other: Vec2D): boolean {
        if (other.y === this.y && other.x === this.x) return true
        return false
    }


    setRandomLocation?() {
        let x: number
        let y: number
        let newLocation: Vec2D
        do {
            x = Math.floor(Math.random() * (canvasDimension.x / tileWidth))
            y = Math.floor(Math.random() * (canvasDimension.y / tileHeight))
            newLocation = new Vec2D(x, y)
        } while (entityLocations.some(value => {
            value.isOn(newLocation)
        }))

        this.x = x
        this.y = y
    }
}

