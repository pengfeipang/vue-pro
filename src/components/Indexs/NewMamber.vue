<template>
    <div class="newmanmber">
        <el-button type="primary" @click="downLoads()">导出会员信息</el-button>
    </div>
</template>

<script>
export default {
    name:'newmanmber',
    data (){
        return {
            imageUrl: ''
        }
    },
    methods:{
        fake_click(obj) {
            var ev = document.createEvent("MouseEvents");
            ev.initMouseEvent(
                "click", true, false, window, 0, 0, 0, 0, 0
                , false, false, false, false, 0, null
            );
            obj.dispatchEvent(ev);
        },
        export_raw(name, data) {
            var urlObject = window.URL || window.webkitURL || window;
            var export_blob = new Blob([data]);
            var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            this.fake_click(save_link);
        },
        downLoads() {
            var use_userinfo = localStorage.getItem("userInfos")
            var data="要保存的文本";
            this.export_raw('range.json', use_userinfo);
        }
    }
}
</script>

<style scoped>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #d9d9d9;
     border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>