import {Snake} from "./snake"
import {Food} from "./food"
import {Powerup} from "./powerup"
import {Entity} from "./entity"
import {Vec2D} from "./vec2D"

export class GameState {

    snakes: Snake[]
    foods: Food[]
    powerups: Powerup[]
    entities: Entity[]
    entityLocations: Vec2D[]


    constructor(snakes: Snake[], foods: Food[], powerups: Powerup[],entities: Entity[], entityLocations: Vec2D[]) {
        this.snakes = snakes
        this.foods = foods
        this.powerups = powerups
        this.entities = entities
        this.entityLocations = entityLocations
    }
}