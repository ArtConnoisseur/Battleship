<script setup lang="ts">
    import { reactive } from 'vue'
    import Cell from '@/components/Cell.vue'

    const { gameboard } = defineProps(['gameboard']);

    const attacks = reactive({
        misses: 0,
        hits: 0
    });

    function handleAttack(x: number, y: number) {
        const result = gameboard.receiveAttack({ x, y });

        if (result) {
            attacks.hits++;
        } else {
            attacks.misses++;
        }
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
                :class="`h-[60px] flex place-content-center aspect-square`"
                @click="() => handleAttack(x, y)"
            >
                <Cell :cell-type="cell.cellType"/>
            </div>
        </div>
    </div>
    Hits: {{attacks.hits}}
    Misses: {{attacks.misses}}
    Total: {{attacks.hits + attacks.misses}}
</template>
