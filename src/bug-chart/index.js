import VueApexCharts from "vue-apexcharts"

export default {
  name: "BugChart",
  components: {
    VueApexCharts
  },
  data() {
    return {
      summary: [],
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
      var date = new Date()
      var time_duration = []

      for (let index = 0; index < 12; ++index) {
        time_duration.push(`${date.getFullYear()}-${date.getMonth() + 1}`)

        date.setMonth(date.getMonth() - 1)
      }

      time_duration.reverse()

      return [{
        name: 'Legit',
        data: time_duration.reduce((acc, time_duration_item) => {
          acc.push({
            x: time_duration_item,
            y: this.summary.reduce((second_acc, item) => {
              if (parseInt(item.Month) != parseInt(time_duration_item.split('-')[1])) {
                return second_acc
              }

              return item.numberOfReports
            }, 0)
          })

          return acc
        }, [])
      }]
    },
  },
  methods: {
    refreshSummary: function(value) {
      this.summary = value
    }
  }
}
