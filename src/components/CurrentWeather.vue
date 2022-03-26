<template>
  <div class="info-container">
    <div class="title"><h2>current weather</h2></div>
    <div class="current-weather" v-if="weather?.current">
      <div class="weather-card">
        <img
          v-bind:src="
            'https://openweathermap.org/img/wn/' +
            this.weather.current.weather[0].icon +
            '@2x.png'
          "
        />
        <div class="weather-card-stats">
          <div>{{ this.coor.name }}, {{ this.coor.country }}</div>
          <div>
            {{
              convertDateTime(
                this.weather.current.dt,
                this.weather.timezone
              )
            }}
          </div>
          <div>{{ this.weather.current.weather[0].description }}</div>
          <div>
            {{ Math.round(this.weather.current.temp) }}°F /
            {{ Math.round(fahrenheitToCelcius(this.weather.current.temp)) }}°C
          </div>
        </div>
      </div>
      <WeatherBar
        :value="Math.round(this.weather.current.feels_like)"
        :valuealt="Math.round(fahrenheitToCelcius(this.weather.current.feels_like))"
        :label="'Feels Like'"
        :unit="'°F'"
        :unitalt="'°C'"
        :class="'lightblue'"
      />
      <WeatherBar
        :label="'min. temperature'"
        :value="Math.round(this.weather.daily[0].temp.min)"
        :valuealt="Math.round(fahrenheitToCelcius(this.weather.daily[0].temp.min))"
        :unit="'°F'"
        :unitalt="'°C'"
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'max. temperature'"
        :value="Math.round(this.weather.daily[0].temp.max)"
        :valuealt="Math.round(fahrenheitToCelcius(this.weather.daily[0].temp.max))"
        :unit="'°F'"
        :unitalt="'°C'"
        :class="'peach'"
      />
      <WeatherBar
        :label="'sunrise'"
        :value="
          convertTime(this.weather.current.sunrise, this.weather.timezone)
        "
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'sunset'"
        :value="
          convertTime(this.weather.current.sunset, this.weather.timezone)
        "
        :class="'peach'"
      />
    </div>
    <div v-else class="no-input">Scan city for weather data</div>
  </div>
</template>

<script>
import WeatherBar from "./WeatherBar.vue";
import TemperatureConverter from '../mixins/TemperatureConverter.js';
import TimeConverter from '../mixins/TimeConverter.js';

export default {
  name: "CurrentWeather",
  components: { WeatherBar },
  props: ["weather", "coor"],
  mixins:[TemperatureConverter, TimeConverter],
  data() {
    return {};
  },
};
</script>

<style>
</style>