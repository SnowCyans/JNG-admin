<template>
  <div class="main">
    <div class="day-night-circle">
      <div class="sun"></div>
      <div class="moon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="stars">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="water"></div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}
.main {
  margin-top: 200px;
}

body {
  display: grid;
  place-items: center;
  font-family: Poppins;
  background: #1d1e22;
}

.day-night-label {
  display: grid;
  gap: 1rem;
  place-items: center;
}

.day-night-circle {
  position: relative;
  background: #2a3741;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  padding: 0px;
  margin: 0 auto;
  margin-bottom: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}
.day-night-circle:hover {
  background: #e9786b;
}
.sun {
  margin-top: 20px;
  background: #f2ef88;
  box-shadow: 0 0 20px rgba(242, 239, 136, 0.4);
  width: 30%;
  height: 30%;
  border-radius: 50%;
  position: relative;
  top: 70%;
  left: 20%;
  transition: all 0.5s ease;
}

.day-night-circle:hover .sun {
  left: 35%;
  top: 48%;
  transition: all 0.5s 0s ease;
}
.moon {
  position: absolute;
  margin-top: 20px;
  background: #d9d8d0;
  box-shadow: inset -10px 2px 0 0px #899098;
  width: 22.5%;
  height: 22.5%;
  border-radius: 100%;
  position: relative;
  margin-left: -50px;
  left: 65%;
  top: -10%;
  overflow: hidden;
  transition: all 0.5s 0s ease;
}
.day-night-circle:hover .moon {
  left: 120%;
  top: -50%;
}
.moon div:nth-child(n) {
  position: relative;
  background: #b9b8b0;
  border-radius: 50%;
  box-shadow: inset 4px -2px 0 0px #535457;
}
.moon div:nth-child(1) {
  top: 25%;
  left: 12%;
  width: 27%;
  height: 27%;
}
.moon div:nth-child(2) {
  top: -11%;
  left: 60%;
  width: 16%;
  height: 16%;
}
.moon div:nth-child(3) {
  top: 25%;
  left: 44%;
  width: 16%;
  height: 16%;
}
.stars {
  opacity: 1;
  margin-left: 100px;
  top: 0;
  left: 0;
  transition: all 0.4s ease;
  z-index: 1000;
}
.day-night-circle:hover .stars {
  opacity: 0;
  transition: all 0.4s ease;
}
.stars div:nth-child(n) {
  position: absolute;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  overflow: hidden;
  width: 0.4%;
  height: 0.4%;
  margin-left: 20%;
  margin-top: -20%;
  transition: all 0.5s ease;
}
.night .stars div:nth-child(n) {
  margin-left: 0;
  margin-top: 0;
  transition: all 1s 0.4s ease-out;
}
.stars div:nth-child(1) {
  left: 25%;
  top: 30%;
}
.stars div:nth-child(2) {
  left: 55%;
  top: 20%;
}
.stars div:nth-child(3) {
  left: 60%;
  top: 60%;
}
.stars div:nth-child(4) {
  left: 40%;
  top: 45%;
}
.stars div:nth-child(5) {
  left: 15%;
  top: 55%;
}
.stars div:nth-child(6) {
  left: 40%;
  top: 10%;
}
.stars div:nth-child(7) {
  left: 80%;
  top: 55%;
}
.water {
  position: absolute;
  background: #7fa1bb;
  width: 100%;
  height: 200px;
  top: 68%;
  transition: all 0.5s ease;
}
.day-night-circle:hover .water {
  background: #71baf2;
}
</style>
