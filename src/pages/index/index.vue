<template>
  <div>
    <!-- 轮播图 -->
    <div class="top">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <div v-for="item in imgUrls" :key="index">
          <swiper-item>
            <image :src="item" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
      
    </div>
    <!-- 头像 -->
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
    </div>
    <!-- 商品 -->
    <div class='bookinfo'>

        <div class="flex_wrap" v-for="(item,index) in list" :key="index">
          <div class="image">
            <img :src="item.imgurl">
            
          </div>
          <div class="content">
            <p class="title">{{item.title}}</p>
            <span class="tlt">{{item.desc}}</span>
            
            <p class="price">{{item.price}}</p>
          </div>
          <button class="kanjia" size="mini" type="warn" @click="kanjia(item.link)">砍价立得</button>
        </div>
   
    <div>
    </div>
  </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: {},
      // indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      list:[
        {
          imgurl:'../../../static/img/101.jpg',
          title:'8.8折加油券',
          link:'101',
          desc:'加油享受8.8折优惠',
          price:'30元'
        },
        {
          imgurl:'../../../static/img/102.jpg',
          title:'100元加油券',
          link:'102',
          desc:'限加油满300元以上使用',
          price:'98元'
        },
        {
          imgurl:'../../../static/img/103.jpg',
          title:'30元电子加油券',
          link:'103',
          desc:'使用时间2018.01.01-2018.0103',
          price:'28元'
        },
        {
          imgurl:'../../../static/img/104.jpg',
          title:'砍价立得100元加油券',
          link:'104',
          desc:'加油限100元以上使用，有效期15天',
          price:'95元'
        },
        {
          imgurl:'../../../static/img/105.jpg',
          title:'50元加油券任你拿',
          link:'105',
          desc:'限15天以内使用，加油满100元使用',
          price:'48元'
        }
      ],
      imgUrls: [
        '../../../static/img/lunbo1.jpeg',
        '../../../static/img/lunbo2.jpg',
        '../../../static/img/lunbo3.jpg',
      ],
      gifurl:"../../../static/img/6.gif"
    }
  },

  components: {
    // toswiper
  },

  methods: {
    kanjia(good){
      wx.navigateTo({
        url: `../detail/main?good_id=${good}`
      });
    }
    
  },

  onShow(){

    this.userInfo=getApp().globalData.userInfo;
  }
}
</script>

<style scoped>
.userinfo {
   float: right;
   /* left: 100%; */
   position: relative;
   padding-top: 260rpx;
}

.userinfo-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.slide-image {
  width: 100%;
  height: 100%;
  
}
.top{
  position: absolute;
  width: 100%;
}
.top swiper{
  height: 350rpx;
}
.image{
  display: flex;
  align-items:center; 
  justify-content:center;
  width:100%;
  height: 100%;
  
}
.bookinfo{
  padding-top: 400rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.title{
  	font-family: "微软雅黑";font-size: 60rpx;color: #333;
}
.tlt{
  font-family: "FangSong";font-size: 40rpx;color:#C0C0C0;
}
.price{
  font-family: "STHupo";font-size: 60rpx;color:#FF0000;
}
.kanjia{
  width: 45%;
  margin-bottom: 10rpx;
  margin-top: -80rpx;
  float: right;
}

</style>
