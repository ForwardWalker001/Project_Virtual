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
      dataVal: this.chartData,
    };
  },
  mounted() {
    // this.initChart();
    this.chartInstance = echarts.init(this.$refs.Chart);
    this.updateChart();
    window.addEventListener("resize", this.handleResize);

    this.timer = setInterval(() => {
      if (this.dataVal != 0) {
        this.option.series[0].data.push(Math.abs(this.dataVal));
        this.chartInstance.setOption(this.option);
        // if (this.option.series[0].data.length >= 30) {
        //   this.option.series[0].data.shift();
        // }
      }
    }, 1000);
  },
  watch: {
    chartData: {
      handler: function (val) {
        this.dataVal = val;
      },
      deep: true,
    },
  },
  methods: {
    updateChart() {
      this.option = {
        title: {
          text: "发电量(W/s)",
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
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {},
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
    clearInterval(this.timer);
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