<template>
  <el-table
    :data="tableData3"
    style="width: 100%"
    align="left"
    height="100vh">
    <el-table-column
      fixed
      prop="datas"
      label="日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="info"
      label="卡号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="list"
      label="卡类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="xf_je"
      label="消费/充值"
      width="120">
    </el-table-column>
    <el-table-column
      prop="yue"
      label="余额/余次"
      width="120">
    </el-table-column>
    <el-table-column
      prop="textarea"
      label="备注"
      width="300">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    name:'other',
    data (){
        return {
            tableData3: []
        }
    },
    created (){
        var use_record = JSON.parse(localStorage.getItem("recordList"))
        this.tableData3 = use_record;
    }
}
</script>

<style scoped>

</style>