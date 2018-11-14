<template>
    <div class="left">
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            theme="dark"
            router
            @close="handleClose">
            <el-menu-item index="/Index/consumer">
                <i class="el-icon-menu"></i>
                <span slot="title">新增会员</span>
            </el-menu-item>
            <el-menu-item index="/Index/consumerlist">
                <i class="el-icon-menu"></i>
                <span slot="title">会员列表</span>
            </el-menu-item>
            <el-menu-item index="/Index/newmamber">
                <i class="el-icon-setting"></i>
                <span slot="title">导出会员信息</span>
            </el-menu-item>
            <el-menu-item index="/Index/other">
                <i class="el-icon-info"></i>
                <span slot="title">消费记录</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name:'left',
    data (){
        return {
            
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
.el-menu {
       border-right: none;
    }
</style>