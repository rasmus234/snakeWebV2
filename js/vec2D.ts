export class Vec2D {
    x: number
    y: number


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public isOn(other: Vec2D): boolean {
        if (other.y === this.y && other.x === this.x) return true
        return false;
    }
}
