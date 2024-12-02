<!--
    This component is made to enable the player to place their ships
    before the game begins
!-->

<script setup lang="ts">
import { Gameboard as GameboardObject, type GameboardCoordinates } from '@/game-logic/game-objects'
    import GameboardComponent from '@/components/PlaceShipBoard.vue'
    import CellIndex from '@/components/svg-components/CellIndex.vue'
    import { Ship } from '@/game-logic/game-objects'
    import { reactive } from 'vue'

    const ships = [
        Ship(2),
        Ship(3),
        Ship(3),
        Ship(4),
        Ship(5),
    ];

    const gameboard = reactive(GameboardObject(10));

</script>

<template>
    <div class="flex flex-col h-full w-full items-center justify-center gap-12">
        <div class="text-primary text-4xl uppercase text-center">
            Welcome commander, {{$route.params.name}}.<br/>
            It is time for you to place your ships strategically...
        </div>
        <GameboardComponent :gameboard="gameboard"/>
    </div>
    <div class="absolute top-10 left-10 w-[15%]">
        <CellIndex/>
    </div>
    <img
        src="@/lib/general-bg.png"
        class="w-full h-full fixed -z-10 inset-0"
        alt="background"
    />
</template>
