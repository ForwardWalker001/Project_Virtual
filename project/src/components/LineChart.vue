<template>
  <div class="chart">
    <div ref="Chart" class="chartContent"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: ["chartData"],
  data() {
    return {
      chartInstance: null,
      option: {},
      objData: [],
    };
  },
  mounted() {
    // this.initChart();
    this.chartInstance = echarts.init(this.$refs.Chart);
    this.updateChart();
    window.addEventListener("resize", this.handleResize);
  },
  watch: {
    chartData: {
      handler: function (val) {
        this.option.series[0].data = val;
        this.chartInstance.setOption(this.option);
      },
      deep: true,
    },
  },
  methods: {
    // initChart() {
    //   this.chartInstance = echarts.init(this.$refs.Chart);
    // },
    updateChart() {
      this.option = {
        title: {
          text: "转速变化",
          left: "center",
        },
        grid: {
          top: 40,
          bottom: 10,
        },
        xAxis: {
          type: "category",
          show: false,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data: this.chartData,
            type: "line",
            smooth: true,
            symbol: 'circle',
          },
        ],
      };
      this.chartInstance.setOption(this.option);
    },
    // 当浏览器大小发生变化会调用该方法，完成屏幕适配
    handleResize() {
      this.chartInstance && this.chartInstance.resize();
    },
  },
  beforeDestroy() {
    this.chartInstance && this.chartInstance.dispose();
    this.chartInstance = null;
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.chartContent {
  /* margin-left: 20px; */
  width: 100%;
  height: 250px;
}
</style>