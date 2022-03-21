<template>
   <div class="forecast-card" v-if="this.forecast?.temp">
       <img v-bind:src="'http://openweathermap.org/img/wn/' + this.forecast.weather[0].icon + '@2x.png' " />
       <h4>min {{ this.forecast.temp.min }} - max {{this.forecast.temp.max}}</h4>
    </div>
   <div class="forecast-card" v-else>SCAN CITY FOR WEATHER DATA</div>
</template>

<script>
export default {
  name: "ForecastCard",
    props: ['forecast'],
};
</script>

<style>
</style>