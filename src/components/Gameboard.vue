<script setup lang="ts">
    import {
        Ship,
        Gameboard
    } from '@/game-logic/game-objects.ts'
    import { reactive, ref } from 'vue'
    import Cell from '@/components/Cell.vue'


    const ship_1 = Ship()
    const ship_2 = Ship(5)
    ship_2.rotate()

    const gameboard = reactive(Gameboard())
    gameboard.placeShip(ship_1, { x: 3, y: 3 })
    gameboard.placeShip(ship_2, { x: 9, y: 5 })

    const attacks = ref(0)

    function handleAttack(x: number, y: number) {
        const result = gameboard.receiveAttack({ x, y })
        // Increment attacks to force a re-render
        attacks.value++
    }
</script>

<template>
    <div class="flex flex-col">
        <div
            v-for="(row, y) in gameboard.gameboard"
            :key="`row-${y}`"
            class="flex"
        >
            <div
                v-for="(cell, x) in row"
                :key="`cell-${x}-${y}`"
                :class="`h-[50px] flex place-content-center aspect-square`"
                @click="() => handleAttack(x, y)"
            >
                <Cell :cell-type="cell.cellType"/>
            </div>
        </div>
    </div>
    {{attacks}}
</template>
