<template v-if="token">
  <div class="page-container">
    <div id="chart">
      <VueApexCharts type=area height=400 :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style src="./style.css" scoped></style>
