<template>
    <div class="consumerlist">
        <el-col :span="8" style="margin-bottom:20px;">
            <el-autocomplete
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="输入搜索"
            :trigger-on-focus="false"
            @select="handleSelect"
            ></el-autocomplete>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
        <!-- <div class="on-line"></div> -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            fixed
            prop="info"
            label="卡号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            width="120">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            width="150">
            </el-table-column>
            <el-table-column
            prop="radio"
            label="性别"
            width="120">
            </el-table-column>
            <el-table-column
            prop="list"
            label="卡类别"
            width="120">
            </el-table-column>
            <el-table-column
            prop="yue"
            label="余额/余次"
            width="100">
            </el-table-column>
            <el-table-column
            prop="value2"
            label="办卡时间"
            width="200">
            </el-table-column>
            <el-table-column
            prop="textarea"
            label="备注"
            width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button type="text" @click="changeNotes(scope.row)" size="small">备注</el-button>
                <el-button @click="handleClick(scope.row)" type="text" size="small">消费</el-button>
                <el-button type="text" @click="handleClickAdd(scope.row)" size="small">充值</el-button>
                <el-button style="color:#d5533d;" type="text" @click="openDelate(scope.row)" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 弹窗 消费 充值 -->
        <el-dialog :title='userInfo.name+"-会员信息"' :visible.sync="outerVisible">
            <!-- <el-dialog
            width="30%"
            title="充值(1=100元)"
            :visible.sync="innerVisible"
            append-to-body>
                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
                <el-button type="primary" plain>确认充值</el-button>
            </el-dialog> -->
            <el-dialog
            width="30%"
            title="充值"
            :visible.sync="innerVisible"
            append-to-body>
                <el-input :placeholder="showOnes.chongzhi" v-model="input3">
                    <template slot="prepend">{{showOnes.chongzhi}}</template>
                </el-input>
                <el-button type="primary" plain style="margin-top:10px" @click="recharge(input3)">充值{{input3}}{{showOnes.ciOrYuan}}</el-button>
            </el-dialog>
            <el-dialog
            width="30%"
            title="消费"
            :visible.sync="innerVisiblePre"
            append-to-body>
                <el-input :placeholder="showOnes.xiaofei" v-model="input3">
                    <template slot="prepend">{{showOnes.xiaofei}}</template>
                </el-input>
                <el-button type="primary" plain style="margin-top:10px" @click="consumption(input3)">消费{{input3}}{{showOnes.ciOrYuan}}</el-button>
            </el-dialog>
                <el-row>
                    <el-button type="text" disabled>姓名</el-button>
                    <el-tag type="danger">{{userInfo.name}}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="text" disabled>卡号</el-button>
                    <el-tag type="danger">{{userInfo.info}}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="text" disabled>卡类别</el-button>
                    <el-tag type="danger">{{userInfo.list}}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="text" disabled>余额/余次</el-button>
                    <el-tag>{{userInfo.yue}}{{showOnes.ciOrYuan}}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="text" disabled>办卡日期</el-button>
                    <el-tag type="success">{{userInfo.value2}}</el-tag>
                </el-row>
                <el-row>
                    <el-button type="text" disabled>手机号码</el-button>
                    <el-tag type="success">{{userInfo.phone}}</el-tag>
                </el-row>
            <div slot="footer" class="dialog-footer">
            <el-button type="warning" @click="innerVisiblePre = true">消费</el-button>
            <el-button type="primary" @click="innerVisible = true">充值</el-button>
            </div>
        </el-dialog>
        <el-button :plain="true" @click="open3" v-show="false">警告</el-button>
        <el-button :plain="true" @click="open2" v-show="false">成功</el-button>
        <!-- 修改备注 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-input
             type="textarea"
            :rows="3"
            v-model="userInfo.textarea">
          </el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">放弃修改</el-button>
            <el-button type="primary" @click="sureC">确认修改</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'consumerlist',
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: '',
        userInfo:{},
        num1:1, // 最低充值
        addMoney:0,
        outerVisible: false,
        innerVisible: false,
        innerVisiblePre:false,
        input3:'', // 消费金额
        tableData: [],
        showOnes:{
            chongzhi:'充值金额',
            ciOrYuan:'元',
            xiaofei:'消费金额'
        },
        dialogVisible: false
      };
    },
    created(){
        var use_userinfo = JSON.parse(localStorage.getItem("userInfos"))
        console.log(use_userinfo)
        use_userinfo.forEach((use)=>{
            if(use.radio == 1) use.radio = '先生'
            if(use.radio == 2) use.radio = '女士'
            if(use.list == 0) use.list = '普通卡'
            if(use.list == 1) use.list = '次数卡'
            if(use.list == 2) use.list = '金卡'
            if(use.list == 3) use.list = '钻石卡'
        })
        this.tableData = use_userinfo;
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        // console.log(this.restaurants)
        // console.log('--------------')
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 充值
      handleChange(value) {
        console.log(value);
        this.addMoney = value;
      },
      createFilter(queryString) {
        // console.log(queryString)
        // console.log('--------------')
        return (restaurant) => {
        // console.log(restaurant)
        // console.log('--------------')
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || restaurant.info.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.tableData;
      },
      handleSelect(item) {
        // console.log(item);
        this.showC(item)
        this.userInfo = item;
        this.outerVisible = true;
      },
      // 修改备注
      changeNotes(row) {
          console.log(row)
        this.userInfo = row;
        this.dialogVisible = true;
        console.log(this.userInfo)  
      },
    //   确认修改
      sureC() {
          this.dialogVisible = false;
          console.log(this.userInfo);
          var newtextA = this.userInfo.textarea
          this.tableData.forEach((table)=>{
              if(table.value2 === this.userInfo.value2){
                table.textarea = newtextA
              }
          })
          localStorage.setItem('userInfos',JSON.stringify(this.tableData))
          this.userInfo = {}
          var msg = '修改备注'
          this.open2(msg)
      },
      // 点击消费展示
      handleClick(row) {
        // console.log(row);
        this.showC(row)
        this.userInfo = row;
        this.outerVisible = true;
      },
      // 点击充值
      handleClickAdd(row) {
        // console.log(row)
        this.showC(row)
          this.userInfo = row;
          this.outerVisible = true;
      },
      //删除信息
      openDelate(row) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log('row删除')
            console.log(row)
            console.log('this.tableData删除')
            console.log(this.tableData)
            const tData = this.tableData.filter((data)=>{
                if(data.phone !== row.phone){
                    return data
                }
            })
            // console.log(tData)
            this.tableData = tData;
            localStorage.setItem('userInfos',JSON.stringify(this.tableData))
            this.$message({
                type: 'success',
                message: '删除成功!'
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      delateOnes(row){
        var newData = tableData.map(function(data){
            if(data.phone != row.phone){
                return data
            }
        })
        console.log(newData+'新列表')
        console.log(row+'row')
        console.log(this.tableData+'列表')
      },
      showC(row) {
          if(row.list == '普通卡') this.showOnes = {
            chongzhi:'充值金额',
            ciOrYuan:'元',
            xiaofei:'消费金额'
        } 
        if (row.list == '次数卡') this.showOnes = {
            chongzhi:'充值次数',
            ciOrYuan:'次',
            xiaofei:'消费次数'
        }
      },
      consumption(money){
          var new_yue = Number(this.userInfo.yue) - Number(money)
          if(new_yue < 0) {
              this.open3()
              return
          }
          this.userInfo.yue = new_yue
          this.tableData.forEach(((table)=>{
              if(table.value2 === this.userInfo.value2){
                table.yue = new_yue
              }
          }))
          localStorage.setItem('userInfos',JSON.stringify(this.tableData))
          var msg = '消费'
          this.open2(msg)
          this.outerVisible = false;
          this.innerVisiblePre = false;
          this.innerVisible = false;
          console.log('userInfo消费')
          console.log(this.userInfo)
          // 记录消费信息
          var use_record = JSON.parse(localStorage.getItem("recordList"))
          var _DATA = this.getDatas();
          var _userInfo = this.userInfo;
          var record = {
              name:_userInfo.name,
              info:_userInfo.info,
              phone:_userInfo.phone,
              xf_je:'消费'+money,
              list:_userInfo.list,
              yue:_userInfo.yue,
              textarea:'普通消费'+money+'',
              datas:_DATA
          }
          if(use_record == null){
              use_record = []
              use_record.push(record);
          } else {
              console.log(use_record);
              use_record.push(record);
          }
          console.log(use_record)
          localStorage.setItem('recordList',JSON.stringify(use_record))
          this.userInfo = {}
      },
      recharge (money){
            var new_yue = Number(this.userInfo.yue) + Number(money)
            this.userInfo.yue = new_yue
            this.tableData.forEach(((table)=>{
              if(table.value2 === this.userInfo.value2){
                table.yue = new_yue
              }
          }))
          localStorage.setItem('userInfos',JSON.stringify(this.tableData))
          var msg = '充值'
          this.open2(msg)
          this.outerVisible = false;
          this.innerVisiblePre = false;
          this.innerVisible = false;
          console.log('userInfo充值')
          console.log(this.userInfo)
          // 记录消费信息
          var use_record = JSON.parse(localStorage.getItem("recordList"))
          var _DATA = this.getDatas();
          var _userInfo = this.userInfo;
          var record = {
              name:_userInfo.name,
              info:_userInfo.info,
              phone:_userInfo.phone,
              xf_je:'充值'+money,
              list:_userInfo.list,
              yue:_userInfo.yue,
              textarea:'普通充值'+money+'',
              datas:_DATA
          }
          if(use_record == null){
              use_record = []
              use_record.push(record);
          } else {
            //   console.log(use_record);
              use_record.push(record);
          }
        //   console.log(use_record)
          localStorage.setItem('recordList',JSON.stringify(use_record))
          this.userInfo = {}
      },
      open3() {
        this.$message({
          message: '余额不足，请充值后再消费',
          type: 'warning'
        });
      },
      open2(msg) {
            this.$message({
                message: '恭喜你，'+ msg +'成功',
                type: 'success'
            });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getDatas(){
        var myDate = new Date();//获取系统当前时间
        var DATA = myDate.toLocaleString();
        return DATA
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>

<style scoped>
.el-button+.el-button {
    margin-left: 0px;
}
</style>