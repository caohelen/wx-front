<template>
    <div>
        <div class="top">
            <span>支付功能暂未开通，您的订单已提交，待支付功能实现，请及时付款</span>
            <button @click="back">返回</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            good_id:'',
        }
    },
    methods:{
        back(){
            let self = this;
            wx.navigateTo({
                url: `../detail/main?good_id=${self.good_id}`
            })
        }
    },
    onLoad(options){
        this.good_id=options.good_id
    }
}
</script>
<style scoped>
.top{
    width: 50%;
    margin-top: 50%;
    margin-left: 25%;
}
</style>
