<template>
  <div class="info-container">
    <div class="title"><h2>current weather</h2></div>
    <div class="current-weather" v-if="weather?.current">
      <div class="weather-card">
        <img
          v-bind:src="
            'http://openweathermap.org/img/wn/' +
            this.weather.current.weather[0].icon +
            '@2x.png'
          "
        />
        <div class="weather-card-stats">
          <div>{{ this.coor.name }}, {{ this.coor.country }}</div>
          <div>
            {{
              this.convertDateTime(
                this.weather.current.dt,
                this.weather.timezone
              )
            }}
          </div>
          <div>{{ this.weather.current.weather[0].description }}</div>
          <div>
            {{ Math.round(this.weather.current.temp) }}°F /
            {{ Math.round((5 / 9) * (this.weather.current.temp - 32)) }}°C
          </div>
        </div>
      </div>
      <WeatherBar
        :value="Math.round(this.weather.current.feels_like)"
        :label="'Feels Like'"
        :unit="'°F'"
        :class="'lightblue'"
      />
      <WeatherBar
        :label="'min. temperature'"
        :value="Math.round(this.weather.daily[0].temp.min)"
        :unit="'°F'"
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'max. temperature'"
        :value="Math.round(this.weather.daily[0].temp.max)"
        :unit="'°F'"
        :class="'peach'"
      />
      <WeatherBar
        :label="'sunrise'"
        :value="
          this.convertTime(this.weather.current.sunrise, this.weather.timezone)
        "
        :class="'darkyellow'"
      />
      <WeatherBar
        :label="'sunset'"
        :value="
          this.convertTime(this.weather.current.sunset, this.weather.timezone)
        "
        :class="'peach'"
      />
    </div>
    <div v-else>Scan city for weather data</div>
  </div>
</template>

<script>
import WeatherBar from "./WeatherBar.vue";

export default {
  name: "CurrentWeather",
  components: { WeatherBar },
  props: ["weather", "coor"],
  data() {
    return {};
  },
  methods: {
    convertDateTime(x, timeZone) {
      const milliseconds = x * 1000;
      const dateObject = new Date(milliseconds);
      const humanDateTimeFormat = dateObject.toLocaleString("en-US", {
        timeZone,
      });
      return humanDateTimeFormat;
    },
    convertTime(x, timeZone) {
      const milliseconds = x * 1000;
      const timeObject = new Date(milliseconds);
      const humanTimeFormat = timeObject.toLocaleTimeString("en-US", {
        timeZone,
      });
      return humanTimeFormat;
    },
  },
};
</script>

<style>
</style>