<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    indicatorData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      options: {
        onClick: this.export,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: (tooltipItems, data) => {
              const label = this.indicatorData.filter(obj => {
                return obj.code === tooltipItems.label
              })
              return label[0].name + ' : ' + tooltipItems.value
            }
          }
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    export (point, event) {
      const item = event[0]
      this.$emit('on-receive', item)
    }
  }
}
</script>

<style>

</style>
