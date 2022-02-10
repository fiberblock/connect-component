<template>
  <div class="connector" @click="$emit('connect', connector.type)">
    <div class="connector__img">
      <img :src="connector.icon" :alt="connector.type" />
    </div>
    <div class="connector__name">{{ connector.name }}</div>
    <div class="connector__desc">{{ connector.description }}</div>
  </div>
</template>

<script>
export default {
  name: "Connector",
  props: {
    connector: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style>
</style>