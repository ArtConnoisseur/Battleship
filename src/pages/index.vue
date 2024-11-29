<script setup>
    import HomepageBorders from '@/components/svg-components/HomepageBorders.vue'
    import PlayButton from '@/components/svg-components/PlayButton.vue'
    import CoolCirclePrimary from '@/components/svg-components/CoolCirclePrimary.vue'
    import CoolCircleAccent from '@/components/svg-components/CoolCircleAccent.vue'
    import ChippedContainer from '@/components/svg-components/ChippedContainer.vue'
    import Graph from '@/components/svg-components/Graph.vue'
    import Battery from '@/components/svg-components/Battery.vue'
    import Progress from '@/components/svg-components/Progress.vue'
    import Scale from '@/components/svg-components/Scale.vue'
</script>

<template>
    <img
        src="@/lib/home-background.png"
        class="w-full h-full fixed -z-10 inset-0"
        alt="background"
    />
    <div class="left-[14%] absolute top-[7%] h-[420px] w-full flex gap-10 items-start">
        <div class="flex flex-col w-fit gap-10 h-fit">
            <CoolCirclePrimary/>
            <CoolCircleAccent/>
        </div>
        <div class="h-[75%] w-fit">
            <ChippedContainer/>
        </div>
        <div class="h-[60%] w-fit">
            <Graph/>
        </div>
        <div class="h-[60%]">
            <Battery/>
        </div>
    </div>
    <div class="absolute top-[47%] flex flex-col gap-5 left-[14%] z-10">
        <h1 class="text-6xl text-primary">
            COMMANDER'S NAME:
        </h1>
        <input
            type='text'
            class="bg-transparent border-b-[1px] border-primary text-6xl text-primary uppercase focus:outline-none"
        />
        <Scale/>
    </div>
    <HomepageBorders/>
    <div class="hero-text absolute bottom-[5%] left-[14%] flex items-baseline">
        BATTLESHIP
        <PlayButton />
    </div>
</template>

<style scoped>
    .hero-text {
        font-size: 12rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
        background: linear-gradient(95deg, #ECD5A9 2.94%, #CD5C50 93.35%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
