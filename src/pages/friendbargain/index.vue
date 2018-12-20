<template>
  <div>
    <div v-if="isshow == false">
    <div class="image"><img :src="url"></div>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="avatarUrl" :src="avatarUrl" background-size="cover" />
    </div>
    
    <div class="top">
      <img src="../../../static/img/back.jpg">
    </div>
      <div class="time">
        
      <span class="span1">剩余时间：</span>  
      <span>{{gohour}}时</span>
      <span>{{gominutes}}分</span>
      <span>{{gosecond}}秒</span>
    </div>

    <div class="weui-progress__bar">
        <progress :percent='percent' stroke-width="6" />
        <p>还差{{coupon_cont}}刀，分享小伙伴一起来砍价</p>
    </div>

    <div class="btn">
      <button type="warn" @click="help" v-if="show==false">帮忙来一刀</button>
      <button type="warn" @click="back" v-if="show==true">返回小化加油首页</button>
    </div>
    
    <div class="userinfo1" v-for="(item,index) in userInfo1" :key="index">
      <img class="userinfo-avatar1" v-if="item.avatarUrl" :src="item.avatarUrl" background-size="cover" />
      <span>{{item.nickName}}</span>
    </div>
    </div>

    <div v-if="isshow == true">
      <span>砍价已结束</span>
    </div>
    
    
  </div>
</template>

<script>
import config from '../../config.js'
export default {
  data () {
    return {
      show:false,
      isshow:false,
      url:'',
      avatarUrl:'',
      gohour:23,
      gominutes:59,
      gosecond:60,
      timer:'',
      coupon_id:'',
      userInfo1:[],
      coupon_cont:'',
      coupon_price:'',
      coupon_total:'',
      percent:'',
      nickName:'',
      userInfo1:'',
    }
  },

  components: {
   
  },

  methods: {
    init(){
      let self = this
      wx.request({
          url: config.selctbargain, // 仅为示例，并非真实的接口地址
          method:'post',
          data: {
            coupon_id:self.coupon_id
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let a = res.data.datas.length-1;
            if(res.data.datas[0].coupon_cont == 0){
              self.isshow = true;
            }else if(res.data.datas[a].coupon_url != null){
              self.avatarUrl = res.data.datas[a].avatarUrl
              self.url = res.data.datas[a].coupon_url
              self.userInfo1 = res.data.datas
              self.coupon_total = res.data.datas[0].coupon_total,
              self.coupon_price = res.data.datas[0].coupon_price,
              self.coupon_cont = res.data.datas[0].coupon_cont,
              self.percent=100-(self.coupon_cont/self.coupon_total).toFixed(2)*100
              // console.log(self.coupon_total)
              
            }
            

          }
      })
    },

    back(){
      wx.switchTab({
        url: '../index/main'
      })
    },

    help(){
      let self = this;
      wx.getUserInfo({
          success(res) {
            const userInfo = res.userInfo
            self.nickName = userInfo.nickName
            self.avatarUrl = userInfo.avatarUrl
            wx.login({
              success(res) {
                if (res.code) {
                  // 发起网络请求
                  wx.request({
                    url:config.bargain,
                    method:'post',
                    data: {
                      code: res.code,
                      avatarUrl:self.avatarUrl,
                      nickName:self.nickName,
                      coupon_id:self.coupon_id,
                      coupon_price:self.coupon_price,
                      coupon_cont:self.coupon_cont-1,
                      coupon_url:'',
                      coupon_total:self.coupon_total,
                    },
                    success(res){
                      if(res.data.code = 1){
                        wx.request({
                            url:config.selctbargain,
                            method:'post',
                            data: {
                              coupon_id:self.coupon_id,
                            },
                            success(res){
                              if(res.data.code = 1){
                                self.userInfo1=res.data.datas
                                self.coupon_total = res.data.datas[0].coupon_total,
                                self.coupon_cont = res.data.datas[0].coupon_cont,
                                self.percent=100-(self.coupon_cont/self.coupon_total).toFixed(2)*100
                                wx.showModal({
                                  content: '砍价成功',
                                  showCancel: false,
                                  success: function (res) {
                                    if (res.confirm) {
                                      console.log('用户点击确定')
                                    }
                                  }
                                });
                                self.show = true;
                              }
                            }
                          })
                      }
                    }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          }
        })
    },
    
    contdown(){
      let that = this;
      //倒计时
      var interval = setInterval(function timestampToTime(){
      that.gosecond= that.gosecond-1;
      if(that.gosecond==0&&that.gominutes==0&&that.gohour==0){
        clearInterval(interval);
        console.log('定时器走完了')
      }else if(that.gosecond == 0 && that.gominutes != 0){
        that.gosecond = 60;
        that.gominutes--;
      }else if(that.gominutes == 0 && that.gominutes == 0 && that.gohour !=0){
        that.gohour--;
        that.gosecond = 60;
        that.gominutes = 59; 
      }
      //个位数补零
      that.gosecond = that.gosecond > 9 ? that.gosecond : '0' + that.gosecond;
      that.gominutes = that.gominutes > 9 ? that.gominutes : '0' + that.gominutes;
      that.gohour = that.gohour > 9 ? that.gohour : '0' + that.gohour;
      
    },1000);
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  },
   onShow:function(){
      //获取全局数据
      this.init()
      this.contdown()
    },
     onLoad: function (options) {
      this.coupon_id=options.coupon_id
  },
}
</script>

<style scoped>
.userinfo {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
}
.image{
  margin-top:70rpx; 
  text-align: center;
position: absolute;
width:100%;
  height: 100%;
}
.time{
  position: absolute;
  width: 100%;
}
.time span{
  position: relative;
  top:-170rpx; 
  left:180rpx;
  font-size: 35rpx;
}
.top{
  margin-top: 400rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top img{
  height: 300rpx;
}
.span1{
  font-family: "STHupo";font-size: 60rpx;color:#FF0000;
}
.btn{
  margin-top: 50rpx;
}
.btn button{
  width: 620rpx;
}
.weui-progress__bar{
  width: 80%;
  margin:0 auto;
  /* padding-top: 620rpx; */
  position: relative;
  top:30rpx;
}
.weui-progress__bar p{
  font-family: "STLiti";font-size:40rpx;color:#FF0000;
}
.userinfo1 {
  margin-top:30rpx; 
  height: 90rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color:	#F0FFF0;
}

.userinfo-avatar1 {
  width: 70rpx;
  height: 70rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.bottom{
  width: 400rpx;
  height: 100rpx;
  margin-top: 50%;
  margin-left: 25%;
}
</style>
