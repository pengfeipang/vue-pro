<template>
    <div class="consumer">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" style=""></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio style="margin-left: -50%;" v-model="ruleForm.radio"  label="1">先生</el-radio>
          <el-radio v-model="ruleForm.radio" label="2">女士</el-radio>
        </el-form-item>
        <!-- <el-form-item label="卡类别" prop="list">
          <el-select v-model="ruleForm.list" @change="handleSelect" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              change="handleSelect"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="卡类别" prop="list">
          <el-select v-model="ruleForm.list" @change="handleSelects" placeholder="请选择">
            <el-option
              v-for="item in optionss"
              :key="item.value"
              change="handleSelect"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="chongZ" label="充值金额" prop="yue">
          <el-input v-model="ruleForm.yue" style=""></el-input>
        </el-form-item>
        <el-form-item v-show="cishu" label="次数" prop="yue">
          <el-input v-model="ruleForm.yue" style=""></el-input>
        </el-form-item>
        <el-form-item label="卡号" prop="info">
          <el-input v-model="ruleForm.info" style=""></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" style=""></el-input>
        </el-form-item>
        <el-form-item label="办卡时间" prop="time">
          <div class="block">
            <el-date-picker
              v-model="ruleForm.value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="textarea">
          <el-input
             type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="ruleForm.textarea">
          </el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary" plain @click="sureOpen()"> 确定开卡 </el-button>
          <el-button type="warning" plain> 重置信息 </el-button>
        </el-row>
      </el-form>
      <div class="show-ones">
        <el-row>
          <el-col :span="8" style="width:100%;">
            <el-card shadow="always">
             <!-- <span>客户信息</span> -->
              <img src="../../assets/simon.jpg" alt="">
              <el-tag>名字: {{ruleForm.name}}</el-tag>
              <br>
              <br>
              <el-tag type="success">性别: {{ruleForm.radio | radioSex}}</el-tag>
              <br>
              <br>
              <el-tag type="info">卡类别: {{ruleForm.list | selectlist}}</el-tag>
              <br>
              <br>
              <el-tag v-show="chongZ" type="info">充值金额: {{ruleForm.yue}}元</el-tag>
              <el-tag v-show="cishu" type="info">充值次数: {{ruleForm.yue}}次</el-tag>
              <br>
              <br>
              <el-tag type="warning">卡号: {{ruleForm.info}}</el-tag>
              <br>
              <br>
              <el-tag type="danger">电话: {{ruleForm.phone}}</el-tag>
              <br>
              <br>
              <el-tag type="warning">办卡时间: {{ruleForm.value2}}</el-tag>
              <br>
              <br>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- 警告 -->
      <el-button :plain="true" @click="open3" v-show="false">警告</el-button>
      <el-button :plain="true" @click="open2" v-show="false">成功</el-button>
    </div>
</template>

<script>
export default {
    name:'consumer',
    data (){
        return {
            
        }
    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      sureOpen() {
        console.log(this.ruleForm)
        // if(this.ruleForm.list == 0) this.ruleForm.yue = this.ruleForm.yue+'元'
        // if(this.ruleForm.list == 1) this.ruleForm.yue = this.ruleForm.yue+'次'
        var _value = this.ruleForm.phone;
        this.ruleForm.value = _value;
        if(this.ruleForm.name == '' || this.ruleForm.info == '' || this.ruleForm.phone == '' || this.ruleForm.value2 == '' || this.ruleForm.radio == '' ){
          this.open3();
          return
        }
        var array = [];
        var use_userinfo = JSON.parse(localStorage.getItem("userInfos"))
        console.log(!use_userinfo)
        // 如果内存中还没有数据，则重新插入,如果已经存在数据，则新增
        if(!use_userinfo){
          array.push(this.ruleForm)
          localStorage.setItem('userInfos',JSON.stringify(array))
        } else {
          // use_userinfo = JSON.stringify(use_userinfo)
          use_userinfo.push(this.ruleForm)
          localStorage.setItem('userInfos',JSON.stringify(use_userinfo))
        }
        this.open2();
        this.ruleForm = {
          name:'',
          info:'',
          phone:'',
          list:'',
          value2:'',
          radio:'1',
          value:'',
          yue:'',
          textarea:''
        }
      },
      open3() {
        this.$message.error('请填写完整信息!');
      },
      open2() {
        this.$message({
          message: '添加会员成功!',
          type: 'success'
        });
      },
      handleSelect(item){
        // console.log(item)
        var _yue = this.options[item].money;
        this.ruleForm.yue = _yue;
      },
      handleSelects(item) {
          // console.log(item)
          if(item == 0) {this.chongZ = true; this.cishu = false}
          if(item == 1) {this.cishu = true; this.chongZ = false}
      }
    },
    data() {
      return {
        ruleForm:{
          name:'',
          info:'',
          phone:'',
          list:'',
          value2:'',
          radio:'1',
          value:'',
          yue:'',
          textarea:''
        },
        chongZ:true,
        cishu:false,
        value:'',
        rules:{

        },
        options: [{
          value: '0',
          label: '普通卡',
          money:500
        }, {
          value: '1',
          label: '银卡',
          money:1500
        }, {
          value: '2',
          label: '金卡',
          money:3000
        }, {
          value: '3',
          label: '钻石卡',
          money:5000
        }],
        optionss: [{
          value:'0',
          label:'普通卡'
        },{
          value:'1',
          label:'次数卡'
        }],
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    filters: {
      radioSex:function(value){
        if(!value) return '先生'
        if(value == 1){
          return '先生'
        } else {
          return '女士'
        }
      },
      selectlist:function(value){
        if(!value) return '普通卡'
        if(value == 0){
          return '普通卡'
        } else if(value == 1){
          return '次数卡'
        } else if (value ==2){
          return '金卡'
        } else {
          return '钻石卡'
        }
      }
    }
}
</script>

<style scoped>
    .consumer {
        height: 100%;
        width: 40%;
    }
    .el-input__inner {
      width: 50%;
    }
    .el-select,.el-input--suffix {
      display: block;
    }
    .el-radio+.el-radio {
      margin-left: 20px;
    }
    .el-radio__label {
      padding-left: 5px;
    }
    form {
      padding: 40px 0px 0px 0px;
    }
    .show-ones {
      position: fixed;
      top: 100px;
      left: 60%;
      width: 30%;
    }
    img {
      width: 100%;
    }
</style>
