<template>
    <div class="index">
        <el-container style="height:100%;">
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" style="background:#409EFF;">
                    <el-menu-item index="1" style="font-size:24px;color:#fff;">西蒙 ✂️ 造型</el-menu-item>
                </el-menu>
            </el-header>
            <el-container>
                <el-aside width="200px" style="background:#fff;">
                <left></left>
                </el-aside>
                <el-main>
                    <router-view>
                        <!-- 子路由 -->
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- <router-link :to="{path:'/Index/consumer'}">123123</router-link>
        <router-view></router-view> -->
    </div>
</template>

<script>
import Left from './Indexs/left'
export default {
    name:'index',
    data (){
        return {
            
        }
    },
    components: {
        'left':Left
    },
    methods: {
        // handleOpen(key, keyPath) {
        //     console.log(key, keyPath);
        // },
        // handleClose(key, keyPath) {
        //     console.log(key, keyPath);
        // }
    }
}
</script>

<style scoped>
    .index {
        height: 100vh;
    }
    li {
        border-bottom: solid 1px #ddd;
    }
    header {
        padding: 0 0;
        margin-bottom: 1px;
    }
    main {
        background: #fff;
        margin-left: 1px
    }
    .el-menu {
       border-right: none;
    }
    a {
        text-decoration:none; 
        color:#333; 
    }
    /* .router-view {
        height: 100%;
        background: skyblue
    } */
</style>
