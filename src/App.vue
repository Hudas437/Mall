<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      res:{}
    }
  },
  mounted(){
    // this.axios.get('/user/login').then((res)=>{
    //   this.res=res;
    // });
    //退出功能优化
     if(this.$cookie.get('userId')){
        this.getUser();
        this.getCartCount();
     }
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={})=>{
        // 保存到VueX中
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        // 保存到VueX中
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style>
/* @import './assets/scss/reset.css';*/
body,div,p,h1,h2,h3,h4,h5,h6,ul,li,dl,dt,a,input,button,textarea,select{
  margin: 0;
  padding: 0;
  outline: none;
}
html,body{
  font-family:Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
  color: #333333;
  background-color: #ffffff;
  min-width: 1226px;
  font-size: 12px;
}
a{
  text-decoration: none;
}
ul,li{
  list-style: none;
}
input{
  font: normal;
}
input:focus,a:focus{
  outline: none;
}
</style>
