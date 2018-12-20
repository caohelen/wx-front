<template>
  <div>
    <div v-if="isshow == true">
      <div class="image"><img :src="url"></div>
      <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
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
        <p>还差{{cont}}刀，分享小伙伴一起来砍价</p>
    </div>

    <div class="btn">
      <button type="warn" @click="me" v-if="show==false">千刀万刀，始于我的开山之刀</button>
      <button type="warn" open-type="share" v-if="show==true">分享给微信朋友</button>
       
    </div>
    
    <div class="userinfo1" v-for="(item,index) in userInfo1" :key="index">
      <img class="userinfo-avatar1" v-if="userInfo1[0].avatarUrl" :src="item.avatarUrl" background-size="cover" />
      <span>{{item.nickName}}</span>
    </div>
  </div>
    <div v-if="isshow == false" class="bottom">
      <span>您没有正在砍价的优惠券，请前往商城选择优惠券</span>
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
      good_id:'',
      url:'',
      userInfo: {},
      userInfo1:[],
      gohour:23,
      gominutes:59,
      gosecond:60,
      timer:'',
      sharfriend:'',
      cont:'',
      total:'',
      coupon_id:'',
      coupon_price:'',
      percent:'',
      play:false,
    }
  },

  components: {
   
  },

  methods: {

    

    me(){
      let self = this;
           wx.login({
            success (res) {
              // console.log(res.code)
              if (res.code) {
                // console.log(e.target.errMsg)
                //发起网络请求
                wx.request({
                  url: config.createcoupon,
                  method:'post',
                  data: {
                    code:res.code,
                    good_id:self.good_id,
                  },
                  success(res){
                      self.coupon_id = res.data.data.coupon_id;
                      self.coupon_price = res.data.data.coupon_price
                      // console.log(self.coupon_id)
                      wx.login({
                        success(res){
                          // var code = res.code
                          wx.request({
                            url: config.bargain,
                            method: 'post',
                            data: {
                              code: res.code,
                              nickName:self.userInfo.nickName,
                              avatarUrl:self.userInfo.avatarUrl,
                              coupon_id:self.coupon_id,
                              coupon_price:self.coupon_price,
                              coupon_cont:self.cont-1,
                              coupon_url:self.url,
                              coupon_total:self.total,
                            },
                            success(res){
                              if(res.data.code == -1){
                                wx.showModal({
                                content: '砍价失败，每人只能砍价一次',
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
                                    console.log('砍价失败，请重新操作')
                                  }
                                }
                              });
                             }else{
                               //发起网络请求
                                wx.request({
                                  url: config.selctbargain,
                                  method: 'post',
                                  data: {
                                    coupon_id:self.coupon_id,
                                  },
                                  success(res){
                                    if(res.data.code == -1){
                                      wx.showModal({
                                      content: '获取砍价信息未成功',
                                      showCancel: false,
                                      success: function (res) {
                                        if (res.confirm) {
                                          console.log('获取砍价信息未成功')
                                        }
                                      }
                                    });
                                   }else{
                                     self.userInfo1=res.data.datas
                                     self.cont=res.data.datas[0].coupon_cont
                                     self.total=res.data.datas[0].coupon_total
                                     self.percent=100-(self.cont/self.total).toFixed(2)*100
                                     self.show=true
                                   }
                                  }
                                });
                             }
                            }
                          })
                        }
                      })
                  }
                })
              } else {
                console.log('获取失败！' + e.target.errMsg)
              }
            }
          });
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
    },

    select(){
      let self = this
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: config.selectcoupon,
              method:'post',
              data: {
                code: res.code
              },
              success(res){
                // console.log(res.data.datas.coupon_id)
                  if(res.data.code == 1 && res.data.datas.coupon_url != ''){
                    getApp().globalData.play = true;
                    self.url=res.data.datas.coupon_url
                    self.coupon_id=res.data.datas.coupon_id
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
                        self.userInfo1=res.data.datas
                        self.cont=res.data.datas[0].coupon_cont
                        self.total=res.data.datas[0].coupon_total
                        self.percent=100-(self.cont/self.total).toFixed(2)*100
                        self.show=true
                        self.isshow=true
                        // console.log(res.data.datas[0].coupon_cont)
                        if(res.data.datas[0].coupon_cont == 0){
                          wx.showModal({
                            content: '您的优惠券砍价结束，请注意在我的优惠券中查看',
                            showCancel: false,
                            success: function (res) {
                              if (res.confirm) {
                                wx.request({
                                  url: config.modifycoupon, // 仅为示例，并非真实的接口地址
                                  method:'post',
                                  data: {
                                    coupon_id:self.coupon_id
                                  },
                                  header: {
                                    'content-type': 'application/json' // 默认值
                                  },
                                  success(res) {
                                    self.isshow = false;
                                    // console.log(res.data)
                                  }
                                })
                              }
                            }
                          });
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

  },




   onShow:function(){
      //获取全局数据
      this.url=getApp().globalData.url;
      this.total=this.cont=getApp().globalData.cont;
      this.good_id=getApp().globalData.good_id;
      this.userInfo=getApp().globalData.userInfo;
      this.isshow=(getApp().globalData.play == true)?true:false;
      // console.log(this.isshow)
      
      this.contdown()
      
    },

    onReady(){
      this.select()
    },

    onShareAppMessage(res) {
    let self = this;
    if (res.from === 'button') {
      // console.log('dadafdaafa')
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '一起来帮我砍一刀!大恩大德，没齿难忘！',
      path: `/pages/friendbargain/main?coupon_id=${self.coupon_id}`,
      imageUrl:'../../../static/img/lunbo1.jpeg',
    }
  }
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
  float: left;
}
.image{
  position: absolute;
  margin-top: 70rpx;
  text-align: center;
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
