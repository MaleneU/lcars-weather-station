<template>
  <div class="weather-bar">
    <div class="weather-bar-label">{{ this.label }}</div>
    <div v-if="this.valuealt" class="weather-bar-value">{{ this.value }}{{ this.unit }} / {{ this.valuealt }}{{ this.unitalt }}</div>
    <div v-else class="weather-bar-value">{{ this.value }}{{ this.unit }}
    </div>
    
  </div>
</template>

<script>
export default {
  name: "WeatherBar",
  props: ['label', 'value', 'valuealt', 'unit', 'unitalt'],
};
</script>

<style>
</style>