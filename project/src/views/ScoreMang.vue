<template>
  <div class="cardBox">
    <el-card class="box-table">
      <!-- 面包屑 -->
      <div style="margin-bottom: 10px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>成绩分析</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 搜索区 -->
      <div class="demo-form-inline">
        <el-form :inline="true" :model="serachCondition" ref="searchForm">
          <el-form-item prop="school" label="学校" class="marginRight">
            <el-input
              v-model="serachCondition.school"
              placeholder="按学校搜索"
            ></el-input> </el-form-item
          ><el-form-item prop="studentnumber" label="学 / 工号" class="marginRight">
            <el-input
              v-model="serachCondition.studentnumber"
              placeholder="按学/工号搜索"
            ></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名" class="marginRight">
            <el-input
              v-model="serachCondition.name"
              placeholder="按姓名搜索"
            ></el-input>
          </el-form-item>
          <el-form-item prop="power" label="身份" class="marginRight">
            <el-select v-model="serachCondition.power" placeholder="请选择">
              <el-option label="学生" value="学生"></el-option>
              <el-option label="教师" value="教师"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="marginRight">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="success" @click="changType">{{ title }}</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格区 -->
      <div class="tableContent" >
        <el-table v-if="showTable" :data="tableData" stripe style="width: 100%">
          <el-table-column
            property="school"
            label="学校"
            min-width="22%"
          ></el-table-column>
          <el-table-column
            property="studentnumber"
            label="学/工号"
            min-width="20%"
          ></el-table-column>
          <el-table-column
            property="name"
            label="姓名"
            min-width="20%"
          ></el-table-column>
          <el-table-column
            property="score"
            label="成绩"
            min-width="18%"
          ></el-table-column>
          <el-table-column
            property="scoredate"
            label="日期"
            min-width="20%"
          ></el-table-column>
        </el-table>
        <charts v-if="!showTable && showChart" :chartData="chartData"></charts>
      </div>
      <!-- 分页 -->
      <div class="paginationContainer" v-if="showTable">
        <el-pagination
          class="elPage"
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          :current-page="currentPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getStorage } from "../util/StorageMan";
import Charts from "../components/charts.vue";

export default {
  components: { Charts },
  data() {
    return {
      tableData: [],
      chartData: [],
      currentPage: 1,
      total: 0,
      showTable: true,
      showChart: false,
      title : '图表展示',
      serachCondition: {
        school: getStorage("userInfo") ? getStorage("userInfo").school : "",
        name: "",
        studentnumber: "",
        power: "学生",
        type: ''
      },
    };
  },
  mounted() {
    // this.scoreContent();
    this.scoreSearch();
  },
  methods: {
    changType() {
      this.showTable = false
      this.showChart = false
      this.serachCondition.type = 'Chart'
      this.scoreSearch()
      setTimeout(()=>{
        this.serachCondition.type = 'Table'
        this.chartData = this.tableData
        this.showChart = true
        // console.log(this.tableData.length)
      },20)
    },
    scoreSearch() {
      console.log(111)
      this.$axios
        .get(`/allScore?currentPage=${this.currentPage}`, {
          params: this.serachCondition,
        })
        .then((res) => {
          let { code, msg } = res.data;
          if (code == 200) {
            this.tableData = res.data.data;
            this.total = res.data.total;
          } else {
            this.$message({
              showClose: true,
              message: msg,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "获取数据失败: " + err,
            type: "warning",
          });
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.scoreSearch();
    },

    onSubmit() {
      this.currentPage = 1;
      this.showTable = true
      this.showChart = false
      this.scoreSearch();
    },
    resetForm(formName) {
      this.showTable = true
      this.showChart = false
      this.$refs[formName].resetFields()
      this.currentPage = 1;
      this.scoreSearch();
    },
  },
};
</script>

<style>
.cardBox {
  width: 100%;
  height: 95%;
  padding-top: 20px;
}
.box-table {
  width: 95%;
  min-height: 100%;
  margin: 0 auto;

  position: relative;
}
.tableContent {
  padding-bottom: 25px;
}
.paginationContainer {
  float: right;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.demo-form-inline {
  margin-top: 20px;
}
.marginRight {
  margin-right: 20px !important;
}
</style>