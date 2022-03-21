<template>
  <div class="app-container">

    <section class="top-content">
      <div class="panel-top-left bottom-right-curve"></div>
      <div class="bar-top grow-2"></div>
      <h1>Weather Station</h1>
      <div class="bar-top"></div>
      <div class="search-bar">
        <input type="text" placeholder="ex. Los Angeles, US" v-model="query" />
        <button type="submit" :disabled="!query" @click="fetchCoordinates();">
          <span>Scan</span>
        </button>
      </div>
      <NumberStream />
    </section>
   
    <main>
      <div class="sidebar"></div>

      <div class="main-content">
         <CurrentWeather :weather="weather" :coor="coordinates[0]" />
        <div class="info-container">
          <div class="title">
            <h2>conditions</h2>
          </div>
          <div class="conditions-container" v-if="weather?.current">
          <WeatherBar :value="weather.current.clouds" :label="'Cloudiness'" :unit="'%'" :class="'blue'"/>
          <WeatherBar :value="weather.current.humidity" :label="'Humidity'" :unit="'%'" :class="'darkyellow'"/>
          <WeatherBar :value="weather.current.pressure" :label="'Pressure'" :unit="' hPa'" :class="'peach'"/>
          <WeatherBar :value="weather.current.uvi" :label="'UV index'" :class="'darkyellow'"/>
          <WeatherBar :value="weather.current.visibility" :label="'visibility'" :unit="' km'" :class="'blue'"/>
          <WeatherBar :value="weather.current.wind_speed" :label="'Wind Speed'" :unit="' mph'" :class="'lightblue'"/>
          <WeatherBar :value="weather.current.wind_deg" :label="'wind direction'" :unit="'°'" :class="'lightblue'"/>
          </div>
          <div v-else>scan city for weather data</div>
        </div>
        <div class="info-container">
          <div class="title"><h2>location</h2></div>
          <div class="weather-map"><img v-if="weather?.current" :src="map"/></div>
        </div>
         <div class="info-container forecast">
    <div class="title"><h2>Forecast</h2></div>
  </div>

       <ForecastCard :forecast="forecast[1]" />
       <ForecastCard :forecast="forecast[2]" />
       <ForecastCard :forecast="forecast[3]" />
       <ForecastCard :forecast="forecast[4]" />
       <ForecastCard :forecast="forecast[5]" />

      </div>
    </main>
    
    <section class="bottom-content"><div class="panel-bottom-left top-right-curve"></div>
     
      </section>

  </div>
</template>

<script>
import NumberStream from './components/NumberStream.vue';
import ForecastCard from './components/ForecastCard.vue';
import WeatherBar from './components/WeatherBar.vue';
import CurrentWeather from './components/CurrentWeather.vue';

export default {
  name: "App",
  components: { NumberStream, ForecastCard, WeatherBar, CurrentWeather },
  data() {
    return {
      url_base_coor: "https://api.openweathermap.org/geo/1.0/",
      api_key_weather: process.env.VUE_APP_API_KEY_WEATHER,
      url_base: "https://api.openweathermap.org/data/2.5/",
      query: "",
      weather: {},
      coordinates: {},
      api_key_map: process.env.VUE_APP_API_KEY_MAP,
      url_base_map: "https://maps.googleapis.com/maps/api/",
      map: "",
      lat: "",
      lon: "",
      forecast: {},
    };
  },
  methods: {
    fetchCoordinates() {
      fetch(
        `${this.url_base_coor}direct?q=${this.query}&appid=${this.api_key_weather}`
      ).then((resp) => {
        return resp.json();

      }).then(this.setCoordinatesResults).then(this.fetchWeather).then(this.fetchMap);
    },
      setCoordinatesResults(resp) {
      this.coordinates = resp;
      this.lat = resp[0].lat;
      this.lon = resp[0].lon;
    },
    fetchWeather() {
      fetch(
        `${this.url_base}onecall?lat=${this.lat}&lon=${this.lon}&units=imperial&APPID=${this.api_key_weather}`
      )
        .then((res) => {
          return res.json();
        })
        .then(this.setWeatherResults);
    },
    setWeatherResults(results) {
      this.weather = results;
      this.forecast = results.daily;
    },
    fetchMap() {
      fetch(
        `${this.url_base_map}staticmap?center=${this.lat},${this.lon}&zoom=14&size=500x500&scale=2&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0xffffff&style=element:labels.text.stroke%7Ccolor:0x000000&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.country%7Celement:labels.text.stroke%7Ccolor:0x000000&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.stroke%7Ccolor:0x000000&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.locality%7Celement:labels.text.stroke%7Ccolor:0x000000&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.business%7Celement:labels.text.fill%7Ccolor:0xffffff&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0xffffff&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0xcc99cc&style=feature:road%7Celement:labels.text.fill%7Ccolor:0xffffff&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1f1f1f&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.highway.controlled_access%7Celement:geometry.fill%7Ccolor:0xffcc66&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0x5599ff&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:water%7Celement:geometry%7Ccolor:0x090909&style=feature:water%7Celement:geometry.fill%7Ccolor:0x090909&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&key=${this.api_key_map}`
      )
        .then((res) => {
          return res.url;
        })
        .then(this.setMapResults);
    },
    setMapResults(res) {
      this.map = res;
    }, 
  },
  mounted() {
    //this.fetchWeather();
    //this.fetchMap();
    
  

  },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
