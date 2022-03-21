<template>
  <div class="weather-bar">
    <div class="weather-bar-label">{{ this.label }}</div>
    <div class="weather-bar-value">{{ this.value }}{{ this.unit }}</div>
  </div>
</template>

<script>
export default {
  name: "WeatherBar",
  props: ['label', 'value', 'unit'],
};
</script>

<style>
</style>