<template>
  <div class="chart">
    <div ref="Chart" style="width: 50%; height: 500px;margin:auto"></div>
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
    };
  },
  mounted() {
    this.handleData();
    this.initChart();
    this.updateChart();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    // 处理数据，变成符合 比例图的数据
    handleData() {
      this.scoreDate = [0, 0, 0, 0, 0];
      this.chartData.map((item) => {
        let val = parseInt(item.score);
        if (val >= 90) {
          this.scoreDate[0]++;
        } else if (val >= 80 && val < 90) {
          this.scoreDate[1]++;
        } else if (val >= 70 && val < 80) {
          this.scoreDate[2]++;
        } else if (val >= 60 && val < 70) {
          this.scoreDate[3]++;
        } else if (val > 0 && val < 60) {
          this.scoreDate[4]++;
        }
      });
    },
    initChart() {
      this.chartInstance = echarts.init(this.$refs.Chart);
    },
    updateChart() {
      this.option = {
        title: {
          text: "成绩比例图",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "bottom",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",

            label: {
              normal: {
                color: "auto",
                formatter: "{b} ({d}%)",
                textStyle: {
                  fontWeight: "normal",
                  fontSize: 15,
                },
              },
            },
            data: [
              { value: this.scoreDate[0], name: "90分及以上" },
              { value: this.scoreDate[1], name: "89至80分" },
              { value: this.scoreDate[2], name: "79至70分" },
              { value: this.scoreDate[3], name: "69至60分" },
              { value: this.scoreDate[4], name: "不及格" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
.chart {
  margin-top: 20px;
}
</style>