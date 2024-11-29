import { describe, it, expect } from "vitest";
import { Ship, Orientation } from "../game-logic/game-objects";

// Tests to test the ship
describe("Ship Factory Function", () => {
    it("should create a ship with a default length of 2 and horizontal orientation", () => {
        const ship = Ship();
        expect(ship.length).toBe(2);
        expect(ship.orientation).toBe(Orientation.HORIZONTAL);  // uses the getter
        expect(ship.hits).toBe(0);
    });

    it("should prevent hitting the same position twice and return false", () => {
        const ship = Ship(3);
        ship.hit(1);
        expect(ship.hit(1)).toBe(false);
        expect(ship.hits).toBe(1);  // Only one hit should be recorded
    });

    it("should correctly determine if the ship is sunk based on hits", () => {
        const ship = Ship(2);
        ship.hit(1);  // First hit
        ship.hit(2);  // Second hit
        expect(ship.isSunk()).toBe(true);  // Ship should be sunk after 2 hits
    });

    it("should not consider the ship sunk if not all positions are hit", () => {
        const ship = Ship(3);
        ship.hit(1);  // First hit
        expect(ship.isSunk()).toBe(false);  // Ship should not be sunk with only 1 hit
    });

    it("should toggle the orientation between HORIZONTAL and VERTICAL", () => {
        const ship = Ship();
        expect(ship.orientation).toBe(Orientation.HORIZONTAL);  // Initial orientation

        ship.rotate();
        expect(ship.orientation).toBe(Orientation.VERTICAL);  // Orientation after first toggle

        ship.rotate();
        expect(ship.orientation).toBe(Orientation.HORIZONTAL);  // Orientation after second toggle
    });
});


