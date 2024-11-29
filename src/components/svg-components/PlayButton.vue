<template>
    <div class="w-[600px] h-fit box-border p-4 border-primary play-container relative bg-transparent play-container">
        <svg width="100%" height="100%" viewBox="0 0 1539 298" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="1536.5" height="295.5" class="container-rectangle"/>
            <path class="play-button" fill-rule="evenodd" clip-rule="evenodd" d="M20 277.5L277.5 20H960.5L703 277.5H20ZM357 74.5V221.5H378.6V162.7C386.533 162.367 393.233 160.4 398.7 156.8C404.233 153.133 408.433 148.067 411.3 141.6C414.167 135.133 415.6 127.433 415.6 118.5C415.6 109.567 414.233 101.8 411.5 95.2C408.767 88.6 404.633 83.5 399.1 79.9C393.633 76.3 386.8 74.5 378.6 74.5H357ZM387.6 138.5C385.4 139.967 382.4 140.7 378.6 140.7V96.5C382.333 96.5 385.3 97.2667 387.5 98.8C389.767 100.333 391.367 102.733 392.3 106C393.3 109.267 393.8 113.5 393.8 118.7C393.8 123.833 393.3 128.033 392.3 131.3C391.367 134.567 389.8 136.967 387.6 138.5ZM427.312 74.5V221.5H477.513V201.5H448.913V74.5H427.312ZM505.95 74.5L483.75 221.5H504.75L508.75 191.5H529.55L533.55 221.5H554.55L532.35 74.5H505.95ZM526.55 168.7H511.75L517.95 119.3L518.55 111.5H519.75L520.35 119.3L526.55 168.7ZM577.906 158.9V221.5H599.506V158.9L621.506 74.5H600.306L589.706 121.5L589.006 127.9H588.406L587.706 121.5L577.106 74.5H555.906L577.906 158.9ZM1011 20L753.5 277.5H865L1122.5 20H1011ZM915.5 277.5L1173 20H1284.5L1027 277.5H915.5ZM1335 20L1077.5 277.5H1144L1401.5 20H1335ZM1194.5 277.5L1452 20H1518.5L1261 277.5H1194.5Z" fill="url(#paint0_linear_34_1728)"/>
            <defs>
                <linearGradient id="paint0_linear_34_1728" x1="695.5" y1="149" x2="1518.5" y2="148.75" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#76D9C5"/>
                    <stop offset="1" stop-color="#23CCFF" stop-opacity="0.5"/>
                </linearGradient>
            </defs>
        </svg>
    </div>
</template>

<style scoped>
    .play-button {
        fill: hsla(var(--primary));
        transition: fill ease-in-out 1s;
    }

    .play-container:hover .play-button {
        fill: url('#paint0_linear_34_1728');
    }

    .container-rectangle {
        stroke-width: 5;
        stroke: hsla(var(--primary));
        stroke-dasharray: 200 3463;
        animation: trace 3s linear infinite;
    }

    @keyframes trace {
        0% {
            stroke-dashoffset: 0;
        }

        100% {
            /* This value is the perimeter of the SVG stroke */
            stroke-dashoffset: 3663;
        }
    }
</style>
