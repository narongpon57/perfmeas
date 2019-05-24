<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        onClick: this.showOUModal,
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    showOUModal (point, event) {
      const item = event[0]
      this.$emit('on-receive', item)
    }
  }
}
</script>

<style>

</style>
