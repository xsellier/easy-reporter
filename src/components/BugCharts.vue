<template v-if="token">
  <div class="page-container">
    <div id="chart">
      <VueApexCharts type=area height=400 :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "BugCharts",
  components: {
    VueApexCharts
  },
  data() {
    return {
      versions: {},
      reports: [],
      chartOptions: {
        chart: {
          height: 320,
          type: "line",
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        markers: {
          size: 0
        },
        stroke: {
          curve: "straight",
          lineCap: "round",
          width: 1
        },
        yaxis: {
          min: 0,
          title: {
            text: 'Reports amount'
          }
        }
      }
    }
  },
  computed: {
    series: function() {
      var time_duration = []
      var MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      var date = new Date()

      var day = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()

      for (var index = 0; index < 8; ++index) {
        time_duration.push(`${year}-${('' + (month + 1)).padStart(2, '0')}-${('' + day).padStart(2, '0')}`)

        day--
        if (day <= 0) {
          month--

          if (month <= 0) {
            month = 12

            year--
          }

          day = MONTHS[month]
        }
      }

      time_duration.reverse()

      var self = this

      return [{
        name: 'Cracked',
        data: time_duration.reduce((acc, time_duration_item) => {
          acc.push({
            x: time_duration_item,
            y: this.reports.reduce((second_acc, item) => {
              if (!item.created_at.startsWith(time_duration_item)) {
                return second_acc
              }

              if (self.versions[item.version] == true) {
                return second_acc + 1
              }

              return second_acc
            }, 0)
          })

          return acc
        }, [])
      }, {
        name: 'Legit',
        data: time_duration.reduce((acc, time_duration_item) => {
          acc.push({
            x: time_duration_item,
            y: this.reports.reduce((second_acc, item) => {
              if (!item.created_at.startsWith(time_duration_item)) {
                return second_acc
              }

              if (self.versions[item.version] != null && self.versions[item.version] == true) {
                return second_acc
              }

              return second_acc + 1
            }, 0)
          })

          return acc
        }, [])
      }]
    },
  },
  methods: {
    refreshReports: function(list) {
      this.reports = list;
    },
    refreshVersions: function(list) {
      this.versions = list.reduce((acc, item) => {
        acc[item.name] = item.cracked

        return acc
      }, {});
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
