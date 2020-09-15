<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 轮播菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <!-- 轮播子菜单1 -->
              <div class="children">
                <ul v-for="(item,i) in menuList" v-bind:key="i">
                  <li v-for="(sub,j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/' + sub.id:''">
                      <img v-bind:src="sub? sub.img:'/imgs/item-box-1.png'"  alt="">
                      {{sub?sub.name:'小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <!-- 轮播图 -->
        <swiper  v-bind:options="swiperOption">
           <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
             <a v-bind:href="'/#/product/'+item.id">
               <img v-bind:src="item.img" />
             </a>
           </swiper-slide>
           <!-- Optional controls -->
           <div class="swiper-pagination"  slot="pagination"></div>
           <div class="swiper-button-prev" slot="button-prev"></div>
           <div class="swiper-button-next" slot="button-next"></div> 
        </swiper>
      </div>
      
      <!-- 广告位 -->
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id" v-for="(item,index) in adsList" v-bind:key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      
      <!-- banner部分 -->
      <div class="banner">
         <a href="/#/product/30">
           <img v-lazy="'/imgs/banner-1.png'" alt="">
         </a>
      </div>
      
    </div>

    <!-- 商品内容区 -->
      <div class="product-box">
        <h2>手机</h2>
        <div class="container5">
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                 <span v-bind:class="{'new-pro':j%2==0,'kil-pro':j%2==1}">{{j%2==0?'新品':'秒杀'}}</span>
                 <div class="item-img">
                   <!-- <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bd25cc614a670f4d5546fe82e239ef86.jpg" alt=""> -->
                    <!-- <img v-lazy="item.img" alt=""> -->

                    <!-- 用vue指令重构 -->
                    <img v-lazy="item.mainImage" alt="">
                 </div>
                 <div class="item-info">
                   <!-- <h3>小米9</h3>
                   <p class="content">晓龙855，索尼4800万超广角微距</p>
                   <p class="price">2999元</p> -->

                   <!-- 用vue指令重构 -->
                   <h3>{{item.name}}</h3>
                   <p class="content">{{item.subtitle}}</p>
                   <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

    <!-- service-bar组件 -->
    <service-bar></service-bar>

    <modal title="提示"
           sureText="确定" 
           btnType="1" 
           modalType="middle" v-bind:showModal="showModal"
           v-on:submit="goToCart"
           v-on:cancel="showModal=false"
           >
           <!-- 最新slot插槽使用 -->
           <template v-slot:body>
             <p>商品添加成功！</p>
           </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name:'index',
  components:{
    Swiper,
    SwiperSlide,
    ServiceBar,
    Modal
  },
  data(){
    return{
      swiperOption:{
        autoplay:true,
        loop:true,
        effect:'cube',
        cubeEffect: {
          slideShadows:true,
          shadow:true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      slideList:[
        {
         id:'42',
         img:'/imgs/slider/slide-1.jpg'
        },
        {
         id:'45',
         img:'/imgs/slider/slide-2.jpg'
        },
        {
         id:'46',
         img:'/imgs/slider/slide-3.jpg'
        },
        {
         id:'42',
         img:'/imgs/slider/slide-4.jpg'
        },
        {
         id:'42',
         img:'/imgs/slider/slide-5.jpg'
        }
      ],
      menuList:[
        [
          {
            id:30,
            img:'/imgs/item-box-1.png',
            name:'小米CC9'
          },
          {
            id:31,
            img:'/imgs/item-box-2.png',
            name:'小米8青春版'
          },
          {
            id:32,
            img:'/imgs/item-box-3.jpg',
            name:'Redmi K20 Pro'
          },
          {
            id:33,
            img:'/imgs/item-box-4.jpg',
            name:'移动4G专区'
          }
        ],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },
        {
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },
        {
          id:45,
          img:'/imgs/ads/ads-3.png'
        },
        {
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      // 静态请求图片
      // phoneList:[[{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4c87947d104ee5833913e4c520108f16.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8737a33c78a94bc36afb860ab23b3939.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ce61b71e2f81df62bd0c05aaa901d22.jpg'}],[{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9aab8a7fa9005ef918c9aa2d5f17c806.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/3c1af9783bdc53ed843af5655ca92009.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/bd25cc614a670f4d5546fe82e239ef86.jpg'},{img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ca9b4f81af709935556bef9aa21a90e8.jpg'}]]
      
      phoneList:[],
      showModal:false,
    }
  },
  mounted(){
      this.init();
  },
  methods:{
      init(){
        this.axios.get('/products',{
          params:{
            categoryId:100012,
            pageSize:14
          }
        }).then((res)=>{
          res.list = res.list.slice(6,14);
          this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)];
      })
     },
     addCart(id){
       this.axios.post('/carts',{
         productId:id,
         selected:true
       }).then((res)=>{
          this.showModal=true;
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
       }).catch(()=>{
         this.showModal = true;
       });
       
     },
     goToCart(){
       this.$router.push('/cart');
     }
}
}
</script>

<style scoped>
  .swiper-container{
    height: 451px;
  }
  .swiper-button-prev{
    left: 274px;
  }
  img{
    width: 100%;
    height: 100%;
  }
  .nav-menu{
    position: absolute;
    width: 264px;
    height: 451px;
    z-index: 9;
    padding: 26px 0;
    background-color: #55585A7a;
    box-sizing: border-box;
  }
  .menu-item{
    height: 50px;
    line-height: 50px;
  }
  .menu-item a{
    font-size: 16px;
    color: #ffffff;
    padding-left:30px;
    display: block;
    position: relative;
  }
  .menu-item a::after{
    content:' ';
    display: inline-block;
    width:10px;
    height:15px;
    background: url(/imgs/icon-arrow.png) no-repeat center;
    background-size: contain;
    position: absolute;
    right:30px;
    top:17.5px;
  }
  .menu-item:hover{
    background-color: #FF6600;
  }
  /*轮播图小菜单栏*/
  .menu-item:hover > .children{
    display: block;
  }
  .children{
    display: none;
    width: 962px;
    height: 451px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 264px;
    border: 1px solid #e5e5e5;
  }
  .children ul{
    display: flex;
    justify-content: space-between;
    height: 75px;
  }
  .children li{
    height: 75px;
    line-height: 75px;
    flex: 1;
    padding-left:23px;
  }
  .children img{
    width: 42px;
    height: 35px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .children a{
    color: #333333;
    font-size: 14px;
  }

  .ads-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 14px;
    margin-bottom: 31px;
  }
  a{
    /* width: 296px; */
    height: 167px;
  }
  img{
    width: 100%;
    height: 100%;
  }

  .banner{
    margin-bottom: 50px;
  }


  .product-box{
    background-color: #f5f5f5;
    padding: 30px 0 50px;
  }
  h2{
    font-size: 22px;
    height: 21px;
    line-height: 21px;
    color: #333333;
    margin-bottom: 20px;
  }
  .wrapper{
    display: flex;
  }
  .banner-left{
    margin-right: 16px;
  }
  .banner-left img{
    width: 224px;
    height: 619px;
  }
  .list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 986px;
    margin-bottom: 14px;
  }
  .list:last-child{
    margin-bottom: 0;
  }
  .item{
    width: 236px;
    height: 302px;
    background-color: #ffffff;
    text-align: center;
  }
  span{
    display: inline-block;
    width: 67px;
    height: 24px;
    line-height: 24px;
    color: #ffffff;
    font-size: 14px;
  }
  .new-pro{
    background-color: #7ecf68;
  }
  .kil-pro{
    background-color: #e82626;
  }
  .item-img img{
    height: 195px;
    width: 100%;
  }
  .item-info img{
    font-size:14px;
    color: #333333;
    line-height: 14px;
    font-weight: bold;
  }
  .content{
    color: #999999;
    line-height: 13px;
    margin: 6px auto 13px;
  }
  .price{
    color: #F20A0A;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
  }
  .price::after{
    display:inline-block;
    background: url('/imgs/icon-cart-hover.png') no-repeat center;
    width:22px;
    height:22px;
    background-size: contain;
    content: ' ';
    margin-left: 5px;
    vertical-align: middle;
  }

.container5{
  width:auto ;
  margin-right: auto;
  margin-left: auto;
  /* 垂直/水平居中 */
  display: flex;
  justify-content: space-between;  
  align-items: center;
}
</style>