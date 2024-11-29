<script setup lang="ts">
import {
    Ship,
    Gameboard,
    GameboardCell
} from '@/game-logic/game-objects.mts'
import { reactive, ref } from 'vue'

const ship_1 = Ship()
const ship_2 = Ship(5)
ship_2.rotate()

const gameboard = reactive(Gameboard())
gameboard.placeShip(ship_1, { x: 3, y: 3 })
gameboard.placeShip(ship_2, { x: 9, y: 5 })

// Create a ref to force re-renders
const attacks = ref(0)

function handleAttack(x: number, y: number) {
    const result = gameboard.receiveAttack({ x, y })
    // Increment attacks to force a re-render
    attacks.value++
}

function getCellColor(cellType: GameboardCell) {
    switch(cellType) {
        case GameboardCell.EMPTY:
            return 'bg-gray-400'
        case GameboardCell.OCCUPIED:
            return 'bg-green-400'
        case GameboardCell.HIT:
            return 'bg-red-400'
        case GameboardCell.MISS:
            return 'bg-blue-400'
        default:
            return 'bg-gray-400'
    }
}
</script>

<template>
    <div class="flex flex-col">
        Attacks: {{attacks}}
        <div
            v-for="(row, y) in gameboard.gameboard"
            :key="`row-${y}`"
            class="flex"
        >
            <div
                v-for="(cell, x) in row"
                :key="`cell-${x}-${y}`"
                :class="`h-[30px] flex place-content-center aspect-square ${getCellColor(cell.cellType)}`"
                @click="() => handleAttack(x, y)"
            >
                {{ cell.cellType }}
            </div>
        </div>
    </div>
</template>
