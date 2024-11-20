import { describe, it, expect } from "vitest";
import {
    Gameboard,
    GameboardCell,
    Orientation,
    Ship
} from '../game-logic/game-objects.mjs'

// Tests for the gameboard object
describe("Gameboard Function", () => {
    it("should initialize an empty gameboard with the specified dimensions", () => {
        const dimensions = 5;
        const gameboard = Gameboard(dimensions);
        expect(gameboard.gameboard.length).toBe(dimensions);
        expect(gameboard.gameboard[0].length).toBe(dimensions);
        gameboard.gameboard.forEach(row => row.forEach(cell => expect(cell.cellType).toBe(GameboardCell.EMPTY)));
    });

    it("should place a horizontal ship within boundaries and mark cells as occupied", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        ship.orientation = Orientation.HORIZONTAL;
        const success = gameboard.placeShip(ship, { x: 0, y: 0 });

        expect(success).toBe(true);
        expect(gameboard.gameboard[0][0].cellType).toBe(GameboardCell.OCCUPIED);
        expect(gameboard.gameboard[0][1].cellType).toBe(GameboardCell.OCCUPIED);
        expect(gameboard.gameboard[0][2].cellType).toBe(GameboardCell.OCCUPIED);
    });

    it("should place a vertical ship within boundaries and mark cells as occupied", () => {
        const gameboard = Gameboard();
        const ship = Ship(3);
        ship.orientation = Orientation.VERTICAL;
        const success = gameboard.placeShip(ship, { x: 0, y: 0 });

        expect(success).toBe(true);
        expect(gameboard.gameboard[0][0].cellType).toBe(GameboardCell.OCCUPIED);
        expect(gameboard.gameboard[1][0].cellType).toBe(GameboardCell.OCCUPIED);
        expect(gameboard.gameboard[2][0].cellType).toBe(GameboardCell.OCCUPIED);
    });

    it("should prevent placing a horizontal ship that exceeds gameboard boundaries", () => {
        const gameboard = Gameboard();
        const ship = Ship(5);
        ship.orientation = Orientation.HORIZONTAL;
        const success = gameboard.placeShip(ship, { x: 8, y: 0 });

        expect(success).toBe(false);
    });

    it("should prevent placing a vertical ship that exceeds gameboard boundaries", () => {
        const gameboard = Gameboard();
        const ship = Ship(5);
        ship.orientation = Orientation.VERTICAL;
        const success = gameboard.placeShip(ship, { x: 0, y: 8 });

        expect(success).toBe(false);
    });

    it("should prevent placing a ship where another ship is already located", () => {
        const gameboard = Gameboard();

        // Place the first ship successfully
        const firstShip = Ship(3);
        firstShip.rotate();
        const firstSuccess = gameboard.placeShip(firstShip, { x: 0, y: 0 });
        expect(firstSuccess).toBe(true);

        // Attempt to place a second ship that overlaps with the first
        const secondShip = Ship(2);
        secondShip.orientation = Orientation.HORIZONTAL;
        const secondSuccess = gameboard.placeShip(secondShip, { x: 0, y: 1 });

        expect(secondSuccess).toBe(false);
    });
});

const gameboard = Gameboard();

const ships = [
    Ship(3),
    Ship(4),
    Ship(2),
];

ships[2].rotate();

gameboard.placeShip(ships[0], { x: 1, y: 1 });
gameboard.placeShip(ships[1], { x: 1, y: 5 });
gameboard.placeShip(ships[2], { x: 3, y: 3 });

gameboard.receiveAttack({ x: 4, y: 4 });
console.log(ships[2].hitState)

gameboard.printGameboard();
