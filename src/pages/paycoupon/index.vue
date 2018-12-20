<template>
    <div>
        <div class="page" v-for="(item,index) in coupon" :key="index">
            <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">金额</div>
                <div class="weui-form-preview__value_in-hd">¥{{item.coupon_price}}</div>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">商品名称</div>
                <div class="weui-form-preview__value">{{item.coupon_name}}</div>
                </div>
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">商品描述</div>
                <div class="weui-form-preview__value">{{item.coupon_descript}}</div>
                </div>
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">商品状态</div>
                <div class="weui-form-preview__value">{{coupon_statute}}</div>
                </div>
            </div>
            <div class="weui-form-preview__ft">
                <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">使用</navigator>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../../../src/config.js'
export default {
    data(){
        return{
            coupon:[],
            coupon_id:'',
            coupon_statute:'',
        }
    },
    methods:{
        init(){
            let self = this;
            wx.login({
                success(res) {
                    if (res.code) {
                    // 发起网络请求
                    wx.request({
                        url: config.getcoupon,
                        method:'post',
                        data: {
                           code: res.code
                        },
                        success(res){
                            // for(i=0;i<=res.data.datas.length;i++){

                            // }
                            if(res.data.datas.length > 0){
                                self.coupon=res.data.datas
                                self.coupon_statute='待付款'
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
    onLoad(){
        this.init()
    }
}
</script>
<style scoped>
.page {
  margin-top: 50px;
}
</style>
