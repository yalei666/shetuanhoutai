import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {Loading} from 'element-ui';
Vue.use(VueAxios,axios);
export const global = {
	post:function(url,body,sucCb,errorCb){
		Vue.axios.post(url,body).then((response)=>{
			//响应成功回调
			console.log('成功回调')
			sucCb && sucCb(response)
		}).catch((response)=>{
			//响应失败回调
			console.log('失败回调')
			errorCb && errorCb(response)
		});
	},
	get:function(url,options={},sucCb,errorCb){
		Vue.axios.get(url,{params:options}).then((response)=>{
			setTimeout(function(){
				sucCb && sucCb(response)
			},500)
		}).catch(function(response){
			errorCb && errorCb(error)
		})
	}
}