<template>
    <div>
        <div class="page" v-if="isshow == true">
            <div class="weui-form-preview">
            <div class="weui-form-preview__hd">
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">金额</div>
                <div class="weui-form-preview__value_in-hd">¥{{coupon_price}}</div>
                </div>
            </div>
            <div class="weui-form-preview__bd">
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">商品名称</div>
                <div class="weui-form-preview__value">{{coupon_name}}</div>
                </div>
                <div class="weui-form-preview__item">
                <div class="weui-form-preview__label">商品描述</div>
                <div class="weui-form-preview__value">{{coupon_descript}}</div>
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
        <div class="bottom" v-if="isshow == false">
            <span>您没有在砍价的优惠券</span>
        </div>
    </div>
</template>
<script>
import config from '../../../src/config.js'
export default {
    data(){
        return{
            coupon_price:'',
            coupon_id:'',
            coupon_statute:'',
            coupon_name:'',
            coupon_descript:'',
            isshow:false,
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
                        url: config.selectcoupon,
                        method:'post',
                        data: {
                           code: res.code
                        },
                        success(res){
                            if(res.data.datas.coupon_url != null){
                                self.coupon_id=res.data.datas.coupon_id
                                 wx.request({
                                    url: config.findcoupon,
                                    method:'post',
                                    data: {
                                        coupon_id:self.coupon_id
                                    },
                                    success(res){
                                        if(res.data.datas.coupon_statute == 0){
                                            self.coupon_price = res.data.datas.coupon_price
                                            self.coupon_name = res.data.datas.coupon_name
                                            self.coupon_descript = res.data.datas.coupon_descript
                                            self.coupon_statute='砍价中';
                                            self.isshow = true;
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
    onLoad(){
        this.init()
    }
}
</script>
<style scoped>
.page {
  margin-top: 50px;
}
.bottom{
    margin-top: 70%;
    margin-left: 23%;
}
</style>
