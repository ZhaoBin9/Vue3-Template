<template>
  <div>count: {{ counter.count }}</div>
  <div>count x 2: {{ double }}</div>
  <button @click="counter.increment">+1</button>
</template>

<script setup name="pinia">
import { useCounterStore } from '@/stores/counter.js'

const counter = useCounterStore()
</script>

<script>
import { mapState, mapActions } from 'pinia'
export default {
  computed: {
    ...mapState(useCounterStore, ['double']),
  },
  methods: {
    ...mapActions(useCounterStore, ['increment']),
  },
}
</script>

<style lang="scss" scoped></style>
