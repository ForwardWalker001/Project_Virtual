<template>
  <el-table
    class="scoreStyle"
    :data="tableData"
    stripe
    border
    style="width: 80%"
  >
    <el-table-column align="center" prop="content" label="实验内容"> </el-table-column>
    <el-table-column align="center" prop="score" label="分值" width="180"> </el-table-column>
    <el-table-column align="center" prop="isComplete" label="是否完成" width="180">
      <template slot-scope="scope">
        <i class="el-icon-circle-check" style="color:#66b1ff;" v-if="scope.row.isComplete"></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          content: "查看实验相关介绍",
          score: 10,
          isComplete: true,
        },
        {
          content: "实验内容-2",
          score: 10,
          isComplete: false,
        },
        {
          content: "实验内容-3",
          score: 10,
          isComplete: false,
        },
        {
          content: "实验内容-4",
          score: 10,
          isComplete: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.scoreStyle {
  width: 80%;
  margin: 0px auto;
}
</style>