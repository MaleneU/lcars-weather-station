<template>
   <div class="forecast-card" v-if="this.forecast?.temp">
      <div class="weather-card">
         <img v-bind:src="'https://openweathermap.org/img/wn/' + this.forecast.weather[0].icon + '@2x.png' " />
         <div class="weather-card-stats">
            <div>{{ convertDate(this.forecast.dt) }}</div>
       <div> {{ this.forecast.weather[0].description }} </div>

         </div>

      </div>
       
       
       <WeatherBar
        :label="'min. temperature'"
        :value="
         Math.round(this.forecast.temp.min)"
         :valuealt="Math.round(fahrenheitToCelcius(this.forecast.temp.min))"
        :unit="'°F'"
        :unitalt="'°C'"
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'max. temperature'"
        :value="
         Math.round(this.forecast.temp.max)"
         :valuealt="Math.round(fahrenheitToCelcius(this.forecast.temp.max))"
        :unit="'°F'"
        :unitalt="'°C'"
        :class="'peach'"
      />
      <WeatherBar
        :label="'wind speed'"
        :value="
         this.forecast.wind_speed"
        :unit="' mph'"
        :class="'lightblue'"
      />
      <WeatherBar
        :label="'cloudiness'"
        :value="
         this.forecast.clouds"
        :unit="' %'"
        :class="'blue'"
      />
      <WeatherBar
        :label="'humidity'"
        :value="
         this.forecast.humidity"
        :unit="' %'"
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'pressure'"
        :value="
         this.forecast.pressure"
        :unit="' hpa'"
        :class="'peach'"
      />
    </div>
   <div v-else class="forecast-card">
      <div class="no-input">SCAN CITY FOR WEATHER DATA</div>
      </div>
</template>

<script>
import TemperatureConverter from '../mixins/TemperatureConverter.js';
import TimeConverter from '../mixins/TimeConverter.js';
import WeatherBar from "./WeatherBar.vue";

export default {
  components: { WeatherBar },
  name: "ForecastCard",
  props: ['forecast'],
  mixins:[TemperatureConverter, TimeConverter],
};
</script>

<style>
</style>