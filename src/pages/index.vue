<script setup lang="ts">
    import {
        Ship,
        Gameboard,
        GameboardCellInterface,
    } from '@/game-logic/game-objects.mjs'
    import { reactive } from 'vue'

    const ship_1 = Ship()
    const ship_2 = Ship(5)
    ship_2.rotate()

    const gameboard = reactive<GameboardCellInterface>(Gameboard())
    gameboard.placeShip(ship_1, { x: 3, y: 3 })
    gameboard.placeShip(ship_2, { x: 9, y: 5 })

    console.log(gameboard)

    const obj = reactive({
        count: 0,
        increase: () => this.count++,
    })
</script>

<template>
<!--    <div class="flex flex-col">-->
<!--        <div-->
<!--            v-for="(row, y) in gameboard.gameboard"-->
<!--            :key="`row-${y}`"-->
<!--            class="flex"-->
<!--        >-->
<!--            <div-->
<!--                v-for="(cell, x) in row"-->
<!--                :key="`cell-${x}-${y}`"-->
<!--                :class="`h-[30px] flex place-content-center aspect-square bg-gray-400`"-->
<!--                @click="-->
<!--                    () => {-->
<!--                        gameboard.receiveAttack({ x: x, y: y })-->
<!--                        gameboard.printGameboard();-->
<!--                    }-->
<!--                "-->
<!--            >-->
<!--                {{ cell.cellType }}-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div @click="obj.increase">
        {{ obj }}
    </div>
</template>
