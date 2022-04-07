<template>
  <div class="cardBox">
    <el-card class="box-table">
      <!-- 面包屑 -->
      <div style="margin-bottom: 10px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>成绩分析</el-breadcrumb-item>
        </el-breadcrumb>
      <!-- 搜索区 -->
      <div>
        
      </div>
      </div>
      <!-- 表格区 -->
      <div  class="tableContent">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column
            property="school"
            label="学校"
            min-width="22%"
          ></el-table-column>
          <el-table-column
            property="studentnumber"
            label="学号"
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
      </div>
      <!-- 分页 -->
      <div class="paginationContainer">
        <el-pagination class="elPage"
          background
          layout="prev, pager, next"
          :page-size="12"
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
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    this.scoreContent();
    this.scoreSearch();
  },
  methods: {
    // 获取总条数
    scoreContent() {
      this.$axios
        .get(`/scoreContent`)
        .then((res) => {
          let { code, msg } = res.data;
          if (code == 200) {
            this.total = res.data.data;
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
            message: "获取总条数失败: " + err,
            type: "warning",
          });
        });
    },
    scoreSearch() {
      this.$axios
        .get(`/allScore?currentPage=${this.currentPage}`)
        .then((res) => {
          let { code, msg } = res.data;
          if (code == 200) {
            this.tableData = res.data.data;
            // console.log(this.tableData,'===')
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
  },
};
</script>

<style>
.cardBox {
  width: 100%;
  height: 95%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
</style>