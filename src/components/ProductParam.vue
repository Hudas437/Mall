<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
        <div class="pro-title">
            {{title}}
        </div>
        <div class="pro-param">
            <a href="jsvascript:;">概述</a><span>|</span>
            <a href="jsvascript:;">参数</a><span>|</span>
            <a href="jsvascript:;">用户评价</a>
            <slot name="buy"></slot>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'nav-bar',
  props:{
    title:String
  },
  data(){
      return{
        isFixed:false
      }
  },
  mounted(){
    window.addEventListener('scroll',this.initHeight)
  },
  methods:{
    initHeight(){
       //考虑页面兼容性
       let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
       this.isFixed = scrollTop > 152? true:false;
    }
  },
  destroyed(){
      window.removeEventListener('scroll',this.initHeight,false)
  }
}
</script>

<style scoped>
  .container{
  width: 1226px;
  margin-right: auto;
  margin-left: auto;
  /* 垂直/水平居中 */
  display: flex;
  justify-content: space-between;  
  align-items: center;
}
  .is_fixed{
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 5px #cccccc;
  }
  .btn{
    color: rgb(248, 244, 244);
    width:110px;
    line-height:30px;
    display: inline-block;
    text-align: center;
    background-color: #FF6600;
    cursor: pointer;
    border: none;
  }
  .nav-bar{
    height: 70px;
    line-height: 70px;
    border-top: 1px solid #e5e5e5;
    background-color: #ffffff;
    z-index: 10;
  }
  .container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pro-title{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  .pro-param{
    font-size: 14px;
  }
  .pro-param a{
    color: #666666;
  }
  .pro-param span{
    margin: 0 10px;
  }
</style>