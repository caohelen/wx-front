<template>
  <div>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <span>{{userInfo.nickName}}</span>
    </div>
    <button class='loginBtn' open-type="getPhoneNumber" @getphonenumber="getphonenumber" v-if="show == true">快速登入</button>
    <button size="mini" v-if="canIUse" open-type="getUserInfo" @getuserinfo="getUserInfo">确定</button>
    <div class="weui-cells weui-cells_after-title" style="margin-top:30rpx;background-color:#F8F8F8">
      <navigator url="../mecoupon/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="couponurl" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">我的优惠券</div>
      </navigator>
    </div>
    <div class="weui-cells weui-cells_after-title" style="margin-top:50rpx;background-color:#F8F8F8">
      <navigator url="../bargaincoupon/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="bargainurl" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">砍价中的优惠券</div>
      </navigator>
    </div>
    <div class="weui-cells weui-cells_after-title" style="margin-top:80rpx;background-color:#F8F8F8">
      <navigator url="../paycoupon/main" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__hd">
          <image :src="payurl" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
        </div>
        <div class="weui-cell__bd">待付款的优惠券</div>
      </navigator>
    </div>
      <!-- <button @click="go">走你</button> -->
  </div>
</template>

<script>
import config from '../../config.js'
export default {
  data () {
    return {
      couponurl:'../../../static/img/coupon.png',
      bargainurl:'../../../static/img/bargain.png',
      payurl:'../../../static/img/pay.png',
      userInfo: {},
      show:true,
    }
  },

  components: {
   
  },

  methods: {
    go(){
      wx.navigateTo({
        url: '../friendbargain/main?coupon_id=0201812142115515'
      });
    },


    checklogin(){
     let self=this;
      wx.login({
          success(res) {
          // console.log(res.code)
          if (res.code) {
              // 发起网络请求
              wx.request({
              url: config.selectlogin,
              method:'post',
              data: {
                  code: res.code
              },
              success(res) {
                  if(res.data.state_code == 1){
                      self.show = false;
                      // console.log(self.show)
                  }
                  // console.log(self.show)
              }
              })
          } else {
              console.log('登录失败！' + res.errMsg)
          }
          }
      })
    },
    
    getphonenumber(e){
      let self=this
      wx.login({
        success (res) {
          console.log(res.code)
          var code = res.code
          var encryptedData = e.target.encryptedData
          var iv = e.target.iv
          // console.log(e.target.encryptedData)
          // console.log(e.target.iv)
          //发起网络请求
          wx.request({
            url: config.login,
            method: 'post',
            data: {
              code: code,
              nickName: self.userInfo.nickName,
              avatarUrl:self.userInfo.avatarUrl,
              gender:self.userInfo.gender,
              proVince:self.userInfo.province,
              city:self.userInfo.city,
              encryptedData:encryptedData,
              iv:iv,
            },
            success(res){
              if(res.data.state_code == 1){
                self.show = false;
                wx.showToast({
                  title: '登入成功',
                  icon: 'success',
                  duration: 3000,
                  mask: true
                });
              }
            }
          });
        }
      })
    }
    
  },
  onLoad(){
    this.checklogin();
  },

  onShow(){
    this.userInfo=getApp().globalData.userInfo;
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color:	#3399FF;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}


.userinfo span{
  margin-left: 60rpx;
  color: 	#FFFFFF;
}
.img{
  margin-right: 5px;vertical-align: middle;width:20px; height: 20px;
}
.loginBtn{
  background-color: #6633FF;
  color:#FFFFFF;
  margin-top: 30rpx;
}
.weui-cells weui-cells_after-title{
  padding-top: 100rpx;
}
</style>
