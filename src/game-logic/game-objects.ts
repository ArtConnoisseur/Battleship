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

        // We return a copy of the hitstate to prevent external
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
    HIT,
    MISS
}

// Interface for GameboardCell
export interface GameboardCellInterface {
    ship: ShipTypes;
    head: GameboardCoordinates;
    cellType: GameboardCell;
}

// Interface to define the types of the Gameboard
export interface GameboardTypes {
    readonly gameboard: Matrix<GameboardCellInterface>;

    printGameboard(): void;
    placeShip(ship: ShipTypes, head: GameboardCoordinates): boolean;
    receiveAttack(coordinates: GameboardCoordinates): boolean | number;
}

export interface GameboardCoordinates {
    x: number;
    y: number;
}
export function Gameboard(dimensions: number = 10): GameboardTypes {
    // Internal matrix representing the gameboard
    const gameboard: Matrix<GameboardCellInterface> = Array.from(
        { length: dimensions },
        () => new Array(dimensions).fill({
            ship: null,
            head: null,
            cellType: GameboardCell.EMPTY
        })
    );

    // Places a ship by taking a ship object
    const placeShip = (ship: ShipTypes, head: GameboardCoordinates): boolean => {
        const { length, orientation } = ship;
        const { x, y } = head;

        if (orientation === Orientation.VERTICAL) {
            if (y + length <= dimensions) {
                // Check for existing ships in the intended cells
                for (let i = 0; i < length; i++) {
                    if (gameboard[y + i][x].cellType !== GameboardCell.EMPTY) {
                        return false; // Return false if any cell is already occupied
                    }
                }
                // Place the ship if no conflicts were found
                for (let i = 0; i < length; i++) {
                    gameboard[y + i][x] = {
                        ship,
                        head,
                        cellType: GameboardCell.OCCUPIED
                    };
                }
                return true;
            }
            return false;
        } else if (orientation === Orientation.HORIZONTAL) {
            if (x + length <= dimensions) {
                // Check for existing ships in the intended cells
                for (let i = 0; i < length; i++) {
                    if (gameboard[y][x + i].cellType !== GameboardCell.EMPTY) {
                        return false; // Return false if any cell is already occupied
                    }
                }
                // Place the ship if no conflicts were found
                for (let i = 0; i < length; i++) {
                    gameboard[y][x + i] = {
                        ship,
                        head,
                        cellType: GameboardCell.OCCUPIED
                    };
                }
                return true;
            }
            return false;
        }
        return false;
    };

    // Receives an attack on the gameboard and returns the outcome.
    //   - true: The attack successfully hit a ship.
    //   - false: The attack missed.
    //   - -1: The attacked location has already been hit.
    const receiveAttack = ({ x, y }: GameboardCoordinates): boolean | number => {
        // Create a new cell object to avoid mutating the entire row
        const cellCopy = { ...gameboard[y][x] };

        // Check if the coordinates are within the gameboard
        if (x < 0 || x >= dimensions || y < 0 || y >= dimensions) {
            return false; // Invalid coordinates
        }

        // Check if the cell has already been attacked
        if (cellCopy.cellType === GameboardCell.HIT || cellCopy.cellType === GameboardCell.MISS) {
            return -1; // Already attacked
        }

        // If the cell is occupied (has a ship)
        if (cellCopy.cellType === GameboardCell.OCCUPIED) {
            // Create a new cell object marked as hit
            gameboard[y][x] = {
                ...cellCopy,
                cellType: GameboardCell.HIT
            };

            // Find the relative position of the hit within the ship
            const relativePosition = cellCopy.ship.orientation === Orientation.VERTICAL
                ? y - cellCopy.head.y + 1
                : x - cellCopy.head.x + 1;

            // Register the hit on the ship
            cellCopy.ship.hit(relativePosition);

            return true; // Successfully hit a ship
        }

        // If the cell is empty, mark only this specific cell as miss
        if (cellCopy.cellType === GameboardCell.EMPTY) {
            gameboard[y][x] = {
                ...cellCopy,
                cellType: GameboardCell.MISS
            };
            return false; // Missed all ships
        }

        return false;
    };

    const printGameboard = () => {
        let gameboardString = '';

        for (const row of gameboard) {
            gameboardString += row.map(cell => {
                    switch (cell.cellType) {
                        case GameboardCell.EMPTY:
                            return '•';
                        case GameboardCell.OCCUPIED:
                            return 'O';
                        case GameboardCell.HIT:
                            return 'X';
                        case GameboardCell.MISS:
                            return '?';
                    }
                }
            ).join(" ") + '\n';
        }

        console.log(gameboardString);
    };

    return {
        get gameboard() {
            // Return a copy to prevent external mutation
            return gameboard.map(row => [...row]);
        },

        printGameboard,
        placeShip,
        receiveAttack
    };
}

