<template>
  <div class="chart">
    <el-table :data="objData" stripe border class="tableBox">
      <el-table-column prop="name" label="分数区分" width="180">
      </el-table-column>
      <el-table-column prop="value" label="人数" width="180"> </el-table-column>
      <!-- <el-table-column prop="address" label="地址"> </el-table-column> -->
    </el-table>
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
    this.handleData();
    this.initChart();
    this.updateChart();
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    // 处理数据，变成符合 比例图的数据
    handleData() {
      let scoreDate = [0, 0, 0, 0, 0];
      this.chartData.map((item) => {
        let val = parseInt(item.score);
        if (val >= 90) {
          scoreDate[0]++;
        } else if (val >= 80 && val < 90) {
          scoreDate[1]++;
        } else if (val >= 70 && val < 80) {
          scoreDate[2]++;
        } else if (val >= 60 && val < 70) {
          scoreDate[3]++;
        } else if (val > 0 && val < 60) {
          scoreDate[4]++;
        }
      });
      this.objData = [
        { value: scoreDate[0], name: "90分及以上" },
        { value: scoreDate[1], name: "89至80分" },
        { value: scoreDate[2], name: "79至70分" },
        { value: scoreDate[3], name: "69至60分" },
        { value: scoreDate[4], name: "不及格" },
      ];
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
          left: "right",
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
            data: this.objData,
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
  /* display: flex;
  justify-content: center; */
}
.tableBox {
  width: 361px;
  float: left;
  margin-left: 80px;
  margin-top: 80px;
}
.chartContent {
  width: 50%;
  height: 500px;
  float: right;
  margin-right: 80px;
}
</style>