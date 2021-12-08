<template>
  <div id="loader-body">
    <div class="loader">
      <div class="face face1">
        <div class="circle"></div>
      </div>
      <p class="loading-text">{{ $t("loading.text") }}</p>
      <div class="face face2">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>

<style scoped>
.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999999999999;
  width: 150px;
}

#loader-body {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #ffffff66;
  z-index: 99999;
}

.loading-text {
  position: absolute;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-weight: 10px;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6,
    0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  box-sizing: border-box;
}

.loader .face {
  position: absolute;
  border: 2px #121212;
}

.loader .face.face1 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  border-left: 5px solid rgb(255, 20, 147);
  border-top: 5px solid rgb(255, 20, 147);
  animation: animate 3s linear infinite;
}

.loader .face.face2 {
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
  border-right: 5px solid rgb(0, 207, 232);
  border-bottom: 5px solid rgb(0, 207, 232);
  animation: animate 3s linear reverse infinite;
}

.loader .face .circle {
  position: absolute;
  top: calc(50% - 1px);
  left: 50%;
  width: 50%;
  height: 2px;
  transform-origin: left;
}

.loader .face.face1 .circle {
  transform: rotate(-5deg);
}

.loader .face.face2 .circle {
  transform: rotate(-90deg);
}

.loader .face .circle:before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  top: -4px;
  right: -6px;
}

.loader .face.face1 .circle:before {
  background: rgb(255, 20, 147);
  box-shadow: 0 0 20px rgb(255, 20, 147), 0 0 40px rgb(255, 20, 147),
    0 0 60px rgb(255, 20, 147), 0 0 80px rgb(255, 20, 147),
    0 0 100px rgb(255, 20, 147), 0 0 5px rgba(255, 20, 147, 0.1);
}

.loader .face.face2 .circle:before {
  background: rgb(0, 207, 232);
  box-shadow: 0 0 20px rgb(0, 207, 232), 0 0 40px rgb(0, 207, 232),
    0 0 60px rgb(0, 207, 232), 0 0 80px rgb(0, 207, 232),
    0 0 100px rgb(0, 207, 232), 0 0 5px rgba(0, 207, 232, 0.1);
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>