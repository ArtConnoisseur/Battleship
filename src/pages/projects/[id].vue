<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    The id is: {{route.params.id}}
  </div>
</template>
