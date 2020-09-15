import Vue from 'vue'
import router from './router'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import App from './App.vue'
import env from './env'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// mock开关
const mock = false;
if (mock) {
    require('./mock/api');
}



// 根据前端的跨域方式做出调节  /a/b ： api/a/b => /a/b
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
//根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response) {
    let res = response.data;
    let path = location.hash;
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {
        if (path != '#/index') {
            window.location.href = '/#/login';
            return Promise.reject(res);
        }
        return Promise.reject(res);
    } else {
        // alert(res.msg);
        Message.warning(res.msg);
        return Promise.reject(res);
    }
}, (error) => {
    let res = error.response;
    Message.error(res.data.message);
    return Promise.reject(error);
});



Vue.config.productionTip = false //生产环境下的提示

Vue.use(Vueaxios, axios);
Vue.use(VueCookie);

Vue.use(VueLazyLoad, {
    loading: '/imgs/loading-svg/loading-bars.svg'
}); //加载图片懒加载插件

Vue.prototype.$message = Message;


new Vue({
    store,
    router, //将router挂载到vue实例中
    render: h => h(App),
}).$mount('#app')