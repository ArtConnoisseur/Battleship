<script setup lang="ts">
    import GreenTile from '@/components/svg-components/GreenTile.vue';
    import RedTile from '@/components/svg-components/RedTile.vue';
    import YellowTile from '@/components/svg-components/YellowTile.vue';
    import WhiteTile from '@/components/svg-components/WhiteTile.vue';

    import { GameboardCell } from '@/game-logic/game-objects'

    const { cellType } = defineProps(['cellType']);
</script>

<template>
    <GreenTile v-if="cellType === GameboardCell.EMPTY" />
    <WhiteTile v-else-if="cellType === GameboardCell.MISS" />
    <RedTile v-else-if="cellType === GameboardCell.HIT" />
    <YellowTile v-else-if="cellType === GameboardCell.OCCUPIED" />
    <GreenTile v-else />
</template>
