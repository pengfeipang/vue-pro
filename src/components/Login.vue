<template>
  <div class="login">
    <div class="middle">
      <h1>{{ msg }}</h1>
      <br>
      <div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="用户名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" type="password"></el-input>
          </el-form-item>
        </el-form>
        </div>
        <el-button type="primary" plain @click="toIndex()">登陆</el-button>
        <el-button type="primary" plain @click="chongZ()">重制</el-button>
    </div>
    <div v-show="showTime">
      <el-alert
        title="用户名或密码错误"
        type="error"
        description="请重新输入"
        show-icon>
      </el-alert>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Simo - 西蒙',
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        password: ''
      },
      userInfo:{},
      showTime:false
    }
  },
  created (){
    var user = {name:'simon',password:'simon'}
    user = JSON.stringify(user)
    localStorage.setItem('user',user)
    var use_user = JSON.parse(localStorage.getItem("user"))
    this.userInfo = use_user;
    console.log(use_user.name)
  },
  methods:{
    toIndex (){
      console.log(this.formLabelAlign.name)
      console.log(this.userInfo.name)
      console.log('------------')
      console.log(this.formLabelAlign.password)
      console.log(this.userInfo.password)
      if(this.formLabelAlign.name === this.userInfo.name && this.formLabelAlign.password === this.userInfo.password){
        this.$router.push({path:'./index'})
      } else {
        this.showTime = true;
        setTimeout(()=>{
          this.showTime = false
        },2000)
      }
      
    },
    chongZ (){
      this.formLabelAlign.name = '';
      this.formLabelAlign.password = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  height: 100%;
  background:url(../assets/bg3.jpeg) repeat;
}
h1, h2 {
  font-weight: normal;
  font-size: 32px;
  color: orangered;
  padding-top:30px;
}
.middle {
  height: 350px;
  width: 40%;
  background: #fff;
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  /* opacity: .6;
  background:skyblue;  */
}
.middle>div {
  width: 85%;
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 20px;
}
a {
  color: #42b983;
}
</style>
