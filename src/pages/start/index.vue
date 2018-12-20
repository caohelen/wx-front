<template>
<div>
    <div v-if="ishow==true" class="pwoer">
      <div class="start">小化加油分享功能体验版，欢迎进行体验</div>
      <button size="mini" v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo" class="info">确定</button>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            ishow:true,
            canIUse: wx.canIUse('button.open-type.getUserInfo'),
        }
    },
    methods:{
        getUserInfo () {
            let self = this;
            // 调用登录接口
                // 查看是否授权
                wx.getSetting({
                success(res) {
                    if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                        // console.log(res.userInfo)
                        getApp().globalData.userInfo = res.userInfo;
                        console.log(getApp().globalData.userInfo)
                        wx.switchTab({
                            url: '../index/main'
                        });
                        self.ishow = false;
                        }
                    })
                    }
                }
                })
        },

    }
}
</script>
<style scoped>
.power{
    background-color:#FFFF;
    position: absolute;
}
.start{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 300rpx;
    font-size: 35rpx;
}
.info{
margin-top: 400rpx;
left: 40%;
float: left;
position: relative;
}
</style>
