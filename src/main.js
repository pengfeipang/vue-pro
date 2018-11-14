// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'

import Login from './components/Login'
import Indexs from './components/index'

// 二级路由
import Consumer from './components/Indexs/Consumer'
import ConsumerList from './components/Indexs/ConsumerList'
import NewMamber from './components/Indexs/NewMamber'
import Other from './components/Indexs/Other'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
// redirect 默认展示的内容
const routes = [
  {path:'/',name:'LoginLink',component:Login},
  {path:'/index',name:'IndexLink',redirect:'/Index/Consumer',component:Indexs,children:[
    {path:'/Index/consumer',name:'ConsumerLink',component:Consumer},
    {path:'/Index/consumerlist',name:'ConsumerListLink',component:ConsumerList},
    {path:'/Index/newmamber',name:'NewMamberLink',component:NewMamber},
    {path:'/Index/other',name:'OtherLink',component:Other}
  ]},
  {path:'*',redirect:'/'}
]
const router = new VueRouter({
  routes,
  mode:'hash'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
