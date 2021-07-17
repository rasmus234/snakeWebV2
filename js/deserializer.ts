import {GameState} from "./gameState"
import {Snake} from "./snake"
import {Vec2D} from "./vec2D"
import {EatOthers, Teleport, Warp} from "./powerup"
import {Food} from "./food"
import {Entity} from "./entity"

export class Deserializer {
    public static deserialize(gameStateJson): GameState {
        gameStateJson = JSON.parse(gameStateJson)
        let snakes = gameStateJson.snakes.map(value => new Snake
        (value.playerNumber
            , ...value.snakeParts.map(value1 => new Vec2D(value1.x, value1.y))))

        let powerups = gameStateJson.powerups.map(value => {
            const location = new Vec2D(value.location.x, value.location.y)
            switch (value.color) {
                case "pink":
                    return new Warp(value.timeLeft, location, null)
                case "green":
                    return new EatOthers(value.timeLeft, location, null)
                case "black":
                    return new Teleport(value.timeLeft, location, null)
            }
        })

        let foods = gameStateJson.foods.map(value => new Food(new Vec2D(value.location.x, value.location.y)))

        let entities: Entity[] = [...snakes, ...foods, ...powerups]
        let entityLocations: Vec2D[] = [
            ...foods.map(value => value.location),
            ...powerups.map(value => value.location),
            ...snakes.flatMap(value => value.snakeParts)]

        const parsedGameState: GameState = new GameState(snakes, foods, powerups, entities, entityLocations)

        return parsedGameState
    }
}