<script setup lang="ts">
    import Gameboard from '@/components/Gameboard.vue'
</script>

<template>
    <img
        src="@/lib/general-bg.png"
        class="w-full h-full fixed -z-10 inset-0"
        alt="background"
    />
    <div class="text-primary text-4xl uppercase">
        Welcome commander, {{$route.params.name}}.<br/>
        It is time for you to place your ships strategically...
    </div>
    <Gameboard/>
</template>
