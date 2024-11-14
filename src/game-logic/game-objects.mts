// Enumeraions for the Orientation of the Ship
export enum Orientation {
    HORIZONTAL,
    VERTICAL,
}

// Interface to define the Ship Types
export interface ShipTypes {
    readonly length: number;
    orientation: Orientation;
    hits: number;
    readonly hitState: Array<number>;

    hit(position: number): boolean;
    isSunk(): boolean;
    rotate(): Orientation;
}

// Factory function to create the ship objects and hold onto their data in closures
// The length attribute is how many tiles the ship shall cover
export function Ship(length: number = 2): ShipTypes {
    // Orientation of the ship
    let orientation: Orientation = Orientation.HORIZONTAL;

    // Array storing the state of the ship, from head to tail
    // storing a head or tail
    const hitState: Array<number> = Array(length).fill(0);

    // Number of hits on the ship
    let hits = 0;

    // Checks if the ship is sunk and returns the appropriate value
    const isSunk = (): boolean => {
        return hits === length;
    };

    // Mark a hit on a given position of the ship and store it
    const hit = (position: number): boolean => {
        // Check if the position is not already hit and mark the hit only then
        if (!hitState[position - 1]) {
            hitState[position - 1] = 1;
            hits++;
            return true;
        }
        return false;
    };

    // Function to toggle the current orientation of the ship
    const rotate = (): Orientation => {
        if (orientation === Orientation.VERTICAL) {
            orientation = Orientation.HORIZONTAL;
        } else {
            orientation = Orientation.VERTICAL;
        }
        // Returns the current orientation
        return orientation;
    };

    return {
        get length() {
            return length;
        },

        get orientation() {
            return orientation;
        },

        set orientation(value: Orientation) {
            orientation = value;
        },

        get hits() {
            return hits;
        },

        set hits(value: number) {
            hits = value;
        },

        // We return a copy of the hitstate so as to prevent external
        // mutation of the list
        get hitState() {
            return [...hitState];
        },

        hit,
        isSunk,
        rotate
    };
}


/*-------------------------------------------------------------------*/


// Generic Matrix type definition to use to represent the game-board
type Matrix<T> = T[][];

// Enum to define the different states that a gameboard cell can take
export enum GameboardCell {
    EMPTY,
    OCCUPIED,
    HIT
}

// Interface to define the types of the Gameboard
export interface GameboardTypes {
    readonly gameboard: Matrix<number>;

    placeShip(ship: ShipTypes, head: GameboardCoordinates): boolean;
    receiveAttack(coordinates: GameboardCoordinates): boolean | number;
}

export interface GameboardCoordinates {
    x: number;
    y: number;
}

export function Gameboard(dimensions: number = 10): GameboardTypes {
    // Internal matrix representing the gameboard
    const gameboard: Matrix<GameboardCell> = Array.from(
        { length: dimensions },
        () => new Array(dimensions).fill(GameboardCell.EMPTY)
    );

    // Places a ship by taking a ship object
    const placeShip = (ship: ShipTypes, head: GameboardCoordinates): boolean => {
        const { length, orientation } = ship;
        const { x, y } = head;

        if (orientation === Orientation.VERTICAL) {
            if (y + length <= dimensions) {
                for (let i = 0; i < length; i++) {
                    gameboard[x][y + i] = GameboardCell.OCCUPIED;
                }
                return true;
            }
            return false;
        } else if (orientation === Orientation.HORIZONTAL) {
            if (x + length <= dimensions) {
                for (let i = 0; i < length; i++) {
                    gameboard[x + i][y] = GameboardCell.OCCUPIED;
                }
                return true;
            }
            return false;
        }
        return false;
    };

    // Takes the coordinates and checks if that location has been hit or not
    // Returns the outcome of the attack
    const receiveAttack = ({ x, y }: GameboardCoordinates): boolean | number => {
        const location = gameboard[x][y];

        // True - Successfully hit a ship
        // False - Did not hit a ship
        // -1 - Already hit the location
        if (location !== GameboardCell.HIT) {
            if (location === GameboardCell.EMPTY) {
                gameboard[x][y] = GameboardCell.HIT;
                return false;
            } else if (location === GameboardCell.OCCUPIED) {
                gameboard[x][y] = GameboardCell.HIT;
                return true;
            }
        }
        return -1;
    };

    return {
        get gameboard() {
            // Return a copy to prevent external mutation
            return gameboard.map(row => [...row]);
        },

        placeShip,
        receiveAttack
    };
}
