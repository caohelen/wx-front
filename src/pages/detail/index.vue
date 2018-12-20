<template>
    <div>
        <div class="image"><img :src="url"></div>
        <div class="btn">
            <button size='mini' class="bargain" type="warn" @click="bargain">砍价马上得</button>
            <button size='mini' class="pay" type="warn" @click="pay">爷有钱，直接付款</button>
        </div>
        <img src="../../../static/img/6.gif">
        <div class="introduce">
            <img src="../../../static/img/xing.png">
            <img src="../../../static/img/xing.png">
            <img src="../../../static/img/xing.png">
            <span>使用规则</span>
            <img src="../../../static/img/xing.png">
            <img src="../../../static/img/xing.png">
            <img src="../../../static/img/xing.png">        
        </div>
        <div class="regular">
            <p>1、任何优惠券可以通过砍价和购买获得，但是每个用户每个月只能一次机会通过砍价获得优惠券。</p>
            <p>2、任何优惠券必须在规定时间内使用，逾期无效。</p>
            <p>3、用户请根据优惠券详情进行购买。</p>
            <p>4、每张优惠券限使用一次。</p>
        </div>
        
    </div>
</template>
<script>
import config from '../../config.js'
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
export default {
    data(){
        return{
            good_id:'',
            url:'',
            content:'',
        }
    },
    methods:{
        bargain(){
         let self = this;
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
                        //如果没有登入请先登入
                        if(res.data.state_code == 0){
                             wx.showModal({
                                title: '登入错误',
                                content: '您还没有登入，请先登入',
                                confirmText: "确定",
                                cancelText: "取消",
                                success: function (res) {
                                console.log(res);
                                if (res.confirm) {
                                    wx.switchTab({
                                        url: `../user/main`
                                    })
                                    // console.log('用户点击主操作')
                                } else {
                                    console.log('用户点击辅助操作')
                                }
                                }
                            });
                        //如果登入成功
                        }else{
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
                                            if(res.data.code == 1){
                                                if(res.data.datas.coupon_url != ''){
                                                    wx.showModal({
                                                    content: '每人只有一次分享砍价的机会',
                                                    showCancel: false,
                                                    success: function (res) {
                                                    if (res.confirm) {
                                                        wx.switchTab({
                                                            url: '../index/main'
                                                        })
                                                    }
                                                    }
                                                });
                                             }else{
                                                wx.request({
                                                    url: config.getgood, // 仅为示例，并非真实的接口地址
                                                    method:'post',
                                                    data: {
                                                        good_id:self.good_id
                                                    },
                                                    header: {
                                                        'content-type': 'application/json' // 默认值
                                                    },
                                                    success(res) {
                                                        // 如果验证成功带参数跳转到tarbar
                                                        var app = getApp();
                                                        app.globalData.url=self.url;
                                                        app.globalData.cont=Math.ceil(res.data.datas.good_price/10)+1;
                                                        app.globalData.good_id=self.good_id;
                                                        self.content = `根据优惠券的价格，您需要再砍${app.globalData.cont}刀`
                                                        // console.log(app.globalData.good_id)
                                                        wx.showModal({
                                                            content: self.content,
                                                            showCancel: false,
                                                            success: function (res) {
                                                            if (res.confirm) {
                                                                app.globalData.play = true,
                                                                wx.switchTab({
                                                                    url: `../shop/main`
                                                                })
                                                            }
                                                            }
                                                        });
                                                    }
                                                })
                                            }

                                            }else if(res.data.code == -1){
                                                wx.request({
                                                    url: config.getgood, // 仅为示例，并非真实的接口地址
                                                    method:'post',
                                                    data: {
                                                        good_id:self.good_id
                                                    },
                                                    header: {
                                                        'content-type': 'application/json' // 默认值
                                                    },
                                                    success(res) {
                                                        // 如果验证成功带参数跳转到tarbar
                                                        var app = getApp();
                                                        app.globalData.url=self.url;
                                                        app.globalData.cont=Math.ceil(res.data.datas.good_price/10)+1;
                                                        app.globalData.good_id=self.good_id;
                                                        self.content = `根据优惠券的价格，您需要再砍${app.globalData.cont}刀`
                                                        // console.log(app.globalData.good_id)
                                                        wx.showModal({
                                                            content: self.content,
                                                            showCancel: false,
                                                            success: function (res) {
                                                            if (res.confirm) {
                                                                app.globalData.play = true,
                                                                wx.switchTab({
                                                                    url: `../shop/main`
                                                                })
                                                            }
                                                            }
                                                        });
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
                    }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
                }
            })
           
        },

    pay(){
        let self = this;
        wx.login({
            success(res) {
                if (res.code) {
                // 发起网络请求
                wx.request({
                    url: config.paycoupon,
                    method:'post',
                    data: {
                      code: res.code,
                      good_id:self.good_id,
                    },
                    success(res){
                        if(res.data.code=1){
                            wx.navigateTo({
                                url: `../order/main?good_id=${self.good_id}`
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
    onLoad: function (options) {
      this.good_id=options.good_id
      this.url=`../../../static/img/${this.good_id}.jpg`
  },
  
}
</script>
<style scoped>
.image {
    display: flex;
    align-items:center; 
    justify-content:center;
    width:100%;
    height: 100%;
}
.image img{
    width: 90%;
}
.btn{
    display: flex;
    align-items:center; 
    justify-content:center;
    margin-top: 20rpx;
}
.bargain{
    margin: 5rpx;
    width: 300rpx;
    /* height: 100rpx; */
    font-size:38rpx;
}
.pay{
    margin: 5rpx;
    width: 420rpx;
    font-size:38rpx;
}
.introduce{
    display: flex;
    align-items:center; 
    justify-content:center;
    margin-top: 5%;
}
.introduce img{
    width:40rpx;
    height: 40rpx;
}
.introduce span{
    font-size: 60rpx;
}
.regular p{
    font-family: "FangSong";font-size: 40rpx;color:#C0C0C0;
}
</style>

