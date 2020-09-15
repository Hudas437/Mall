<template>
  <div class="order-list">
    <order-header title="订单列表">
         <template v-slot:tip>
          <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
        </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination"
            background
            layout="prev, pager, next"
            :pageSize="pageSize"
            :total="total"
            @current-change="handleChange"
            >
          </el-pagination>
          <no-data v-if="!loading && list.length==0"></no-data>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination } from 'element-ui'
export default {
  name:'order-list',
   data(){
      return{
         loading:true,
         list:[],
         pageSize:10,
         pageNum:1,
         total:0   
      }
  },
  components:{
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]:Pagination
  },
  mounted(){
    this.getOrderList();
  },
  methods:{
      getOrderList(){
        this.axios.get('/orders',{
           params:{
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.loading = false;
          this.list = res.list;
          this.total = res.total;
        }).catch(()=>{
          this.loading = false;
        })
      },
      goPay(orderNo){
        // 三种路由跳转方式
        // this.$router.push('/order/pay')
        /*this.$router.push({
          name:'order-pay',
          query:{
            orderNo
          }
        })*/
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      },
      handleChange(pageNum){
        this.pageNum = pageNum;
        this.getOrderList();
       }
    }
}
</script>

<style scoped>
    .wrapper{
      background-color:#F5F5F5;
      padding-top:33px;
      padding-bottom:110px;
    }
    .order{
      border: 1px solid #d7d7d7;
      background-color:#ffffff;
      margin-bottom:31px;
    }

    /* ------------------------------------------- */
    .order:last-child{
      margin-bottom:0;
    }
    .order-title{
      height: 74px;
      line-height: 74px;
      background-color:#FFFAF7;
      padding:0 43px;
      font-size:16px;
      color:#666666;
    }
            
    .item-info span{
      margin:0 9px;
    }
            
    .money{
      font-size:26px;
      color:#333333;
    }
          
    .order-content{
      padding:0 43px;
    }
    .good-box{
      width:88%;
    }
    .good-list{
      display: flex;
      align-items: center;
      height:145px;
    }
    .good-img{
      width:112px;
    }
    .good-img img{
      width:100%;
    }
                
    .good-name{
      font-size:20px;
      color:#333333;
    }
              
          
    .good-state{
      height: 145px;
      line-height: 145px;
      font-size: 20px;
      color:#FF6600;
    }
    .good-state a{
      color:#FF6600;
    }
    .container{
      position: relative;
      width:1226px;
      margin-right:auto;
      margin-left:auto;
    }
    .fl{
    float: left;
    }
    .fr{
    float: right;
    }
    /* 清楚浮动 */
    .clearfix:before,.clearfix:after{
      content:' ';
      display:table;
    }
    .clearfix:after{
      clear: both;
    }

    .pagination{
      text-align:right;
    }

    /* 出问题,background-color无法生效 即无法在style上添加scoped生效 */
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background-color: #FF6600;
      color: #FFF;
    }

    
</style>