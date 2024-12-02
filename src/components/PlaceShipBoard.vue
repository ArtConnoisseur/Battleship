<script setup lang="ts">
import Cell from '@/components/Cell.vue'

import type { GameboardCoordinates } from '@/game-logic/game-objects'
import { reactive } from 'vue'

const { gameboard } = defineProps(['gameboard']);

const currentHead : GameboardCoordinates = reactive({ x: 0, y: 0 });

function handleEnterCell ( coordinates : GameboardCoordinates ) : void {
    console.log( coordinates )
}

function handleLeaveCell ( coordinates : GameboardCoordinates ) : void {
    console.log( coordinates )
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
                @mouseenter="() => handleEnterCell({ x, y })"
                @mouseleave="() => handleLeaveCell({ x, y })"
            >
                <Cell :cell-type="cell.cellType" />
            </div>
        </div>
    </div>
</template>
