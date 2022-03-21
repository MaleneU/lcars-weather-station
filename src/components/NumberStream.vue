<template>
  <div class="data-stream">
    <div v-for="n in number" class="numbers" :key="n">00000</div>
  </div>
</template>

<script>
export default {
  name: "NumberStream",
  data() {
    return {
      number: 20,
    };
  },
  methods: {
    getDataStream() {
      var numbersDiv = document.getElementsByClassName("numbers");
      for (var i = 0; i < numbersDiv.length; i++) {
        numbersDiv[i].innerHTML =
          Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
      }
    },
  },
  mounted() {
    setInterval(this.getDataStream, 1500);
  },
};
</script>

<style>
</style>