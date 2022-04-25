<template>
  <el-table
    class="scoreStyle"
    :data="tableData"
    stripe
    border
    style="width: 80%"
    v-if="isShow"
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
      isShow:true,
      tableData: this.$EventBus.tableData,
    };
  },
  mounted() {
    
    // this.$EventBus.$on('changType',(val)=>{
    //   this.tableData[val].isComplete = true1
    //   console.log(val)
    // })
  }
};
</script>

<style scoped>
.scoreStyle {
  width: 80%;
  margin: 0px auto;
}
</style>