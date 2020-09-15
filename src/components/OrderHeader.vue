<template>
  <div class="order-header">
    <div class="container" clearfix>

      <div class="header-logo">
        <a class="alogo" href="/#/index"></a>
      </div>

      <div class="title">
        <h2>{{title}}<slot name="tip"></slot></h2>
      </div>

      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name:'order-header',
  props:{
      title:String
  },
  computed:{
      username(){
         return this.$store.state.username;
      }
   }
}
</script>

<style scoped> 
  .order-header{
    padding: 30px 0;
    border-bottom: 2px solid #FF6600;
  }
  .container{
    width: 1226px;
    margin-right: auto;
    margin-left: auto;
    /* 垂直/水平居中 */
    display: flex;
    justify-content: space-between;  
    align-items: center;
  }
  .header-logo{
   display: inline-block;
   width: 55px;
   height: 55px;
   background-color: #FF6600;
 }
  .alogo{
   display: inline-block;
   width: 110px;
   height: 55px;
  }
.alogo::before{
   content: ' ';
   display: inline-block;
   width: 55px;
   height: 55px;
   background:url('/imgs/mi-logo.png') no-repeat center;
   background-size: 55px;
   transition: margin .2s;
}
.alogo::after{
   content: ' ';
   display: inline-block;
   width: 55px;
   height: 55px;
   background:url('/imgs/mi-home.png') no-repeat center;
   background-size: 55px;
}
.alogo:hover::before{
   margin-left: -55px;
   transition: margin .2s;
}
  .title{
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title{
    float: left;
    margin-left: 54px;
  }
  .title h2{
    font-size: 28px;
    color: #333333;
  }
  .title span{
    font-size: 14px;
    margin-left: 17px;
    color: #999999;
    font-weight: 200;
  }
  .username{
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .username{
    float: right;
  }
  .username a{
    color: #666666;
    font-size: 16px;
  }
  /* 清楚浮动 */
  .clearfix:before,.clearfix:after{
    content:' ';
    display:table;
  }
  .clearfix:after{
    clear: both;
  }
</style>