import { Line } from 'vue-chartjs'
//import { Line, mixins } from 'vue-chartjs'
//const { reactiveProp } = mixins
import 'chartjs-plugin-annotation'

export default {
  extends: Line,
  //mixins: [reactiveProp],
  props: ['chartData', 'options'],
  /*mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },*/
  watch: {
    options: {
      handler(newOption, oldOption) {
        if (this.$data._chart) {
          if(this.$data._chart.data.datasets[0].data.length > 200){
            this.$data._chart.data.datasets[0].data.splice(0, 200)
            this.$data._chart.data.datasets[1].data.splice(0, 200)
          }
        }
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
  }
}