<script setup lang="ts">
    import Cell from '@/components/Cell.vue'
    import { GameboardCoordinates } from '@/game-logic/game-objects'

    const { gameboard } = defineProps(['gameboard']);

    function handleCoordinateHover( coordinates : GameboardCoordinates ) : void {
        
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
                @hover=""
            >
                <Cell :cell-type="cell.cellType"/>
            </div>
        </div>
    </div>
    {{attacks}}
</template>
