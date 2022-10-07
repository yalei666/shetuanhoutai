	<template>
	<div class="app-container">
		<el-dialog :visible.sync="dialogVisible" :show-close="false">	
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form ref="addshetuanform" :model="addshetuanform" label-width="90px" :inline="true">
				    <el-form-item label="社团名称" prop="name">
				        <el-input v-model="addshetuanform.name"></el-input>
				    </el-form-item>
				    <el-form-item label="社团所属" prop="shuyu">
				        <el-input v-model="addshetuanform.shuyu"></el-input>
				    </el-form-item>				    
				    <el-form-item label="社团标语" prop="biaoyu">
				        <el-input v-model="addshetuanform.biaoyu"></el-input>
				    </el-form-item>
				    <el-form-item label="社团简介" prop="jianjie">
				        <el-input v-model="addshetuanform.jianjie" type="textarea" :rows="2"></el-input>
				    </el-form-item>	
				    <el-form-item label="社团负责人" prop="chairman">
						  <el-select 
						  	v-model="addshetuanform.chairManXuehao" 
						  	placeholder="请输入完整学号" 
						  	multiple
    						filterable
    						remote
    						:remote-method="selectPartyChair"
    						:loading="loading">
						    <el-option
						      v-for="item in chairManOptions"
						      :key="item.xuehao"
						      :label="item.realname"
						      :value="item.xuehao">
						      <span style="float: left">{{ item.realname }}</span>
						      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.xuehao }}</span>
						    </el-option>
						  </el-select>
				    </el-form-item>						    	  
				    <el-form-item label="社团头像" class="touxianavater" >
							<el-upload
							  class="avatar-uploader"
							  action="#"
							  :show-file-list="false"
							  accept="image/png,image/gif,image/jpg,image/jpeg"
							  :on-change="handlefilechange"
							  :auto-upload="false"
							  >
							  <div class="opacity-layer" :class="{hide:xianshi}">修改头像</div>
							  <img :src="addshetuanform.imageUrl" class="avatar" @mouseover="xianshi = false" @mouseout="xianshi = true">
							</el-upload>
				    </el-form-item>	    		  
					</el-form>
				</el-col>
				<el-col :span="12">
					<div id="cardcontent">
						<el-row :gutter="1">
							<el-col :span="8">
								<p>社团展示卡片预览：</p>							
							</el-col>
							<el-col :span="16">
								<card :datalist="addshetuanform"></card>		
							</el-col>			
						</el-row>		
					</div>
				</el-col>				
			</el-row>
		  <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="handleupload" :disabled="tijiao_button_status" :loading="tijiao_button_status">立即创建</el-button>
				<el-button @click="fankuixianshi">取 消</el-button>
		  </span>
		</el-dialog>  	
	</div>	
</template>
<script type="text/javascript">
	import {global} from '../../global/global';
	import {api} from '../../global/api';	
	import card  from '../card/card.vue'
    export default {
    	components:{card},
    	props:['shetuaninfo','fushetuanxianshi','chairManOptionszi'],
	    data() {
	      return {
	        addshetuanform:{
		    		name:null,
		    		biaoyu:null,
		    		shuyu:null,	
		    		jianjie:null,
		    		imageUrl:null,
		    		shetuanImgUrl:'',
		    		id:null,
		    		chairManXuehao:null
	        },
					xianshi:true,
					formdata:new FormData(),
					tijiao_button_status:false,
					dialogVisible : null,
					loading:false,
					chairManOptions:[]      
	      }
	    },
	    methods: {
				handleupload(){
					var that = this;
					that.tijiao_button_status = true
					this.formdata.append('name',this.addshetuanform.name);
					this.formdata.append('biaoyu',this.addshetuanform.biaoyu);
					this.formdata.append('shuyu',this.addshetuanform.shuyu);
					this.formdata.append('jianjie',this.addshetuanform.jianjie);
					this.formdata.append('id',this.addshetuanform.id);
					this.formdata.append('chairmanxuehao',this.addshetuanform.chairManXuehao);
					this.formdata.append('chuangjianshijian',this.getNowFormatDate());
					this.$refs['addshetuanform'].resetFields();
					global.post(api.addNewshetuan,this.formdata,function(res){	
						that.formdata = new FormData();
						that.addshetuanform.imageUrl      = require('../../assets/img/touxiang.jpg') 
						that.addshetuanform.shetuanImgUrl = ''
						if(res.data.resultCode == 1){
							that.tijiao_button_status = false			
							that.$message({
				          message: res.data.resultMsg,
				          type: 'success'							
							})
							that.$emit('child-event-show',false)
							that.$emit('child-event-get',false)																					
						}else{
							that.$message({
					          message: res.data.resultMsg,
					          type: 'error'							
							})						
						}					
					},function(rej){
						console.log(rej);
					});
				},        
				handlefilechange(file,filelist){
					this.formdata.append('file',file.raw);
					var _this  = this;
					var event  = event || window.event;
					var file   = event.target.files[0];
					var reader = new FileReader();
					reader.onload = function(e){
						_this.addshetuanform.imageUrl      = e.target.result
						_this.addshetuanform.shetuanImgUrl = e.target.result
					}
					reader.readAsDataURL(file)
				},
				getNowFormatDate(){
					let date = new Date(),
						year    = date.getFullYear(),
						month   = date.getMonth()+1,
						strDate = date.getDate()
					month   = month>=1   &&	month<=9 ? '0'+month:month
					strDate = strDate>=1 &&	strDate<=9 ? '0'+strDate:strDate
					return year+'-'+month+'-'+strDate
				},
				fankuixianshi(){
					this.$emit('child-event-show',false)
				},
				selectPartyChair(query){
					if(query !== ''){
						this.loading = true
						var that = this
						global.get(api.selectPartyChair_api,{xuehao:query},function(res){
							var data = res.data
							that.loading = false
							if(data.resultCode == 1){
								that.chairManOptions = data.resultData
							}else{
								that.chairManOptions = []
							}
						},function(rej){

						})
					}			
				},
	    },
	    watch:{
	    	fushetuanxianshi(newVal){
	    		this.dialogVisible = newVal
	    	},
	    	shetuaninfo(newVal){
	    		this.addshetuanform.name      		 = newVal.name
	    		this.addshetuanform.biaoyu         = newVal.biaoyu
	    		this.addshetuanform.shuyu          = newVal.shuyu
	    		this.addshetuanform.jianjie        = newVal.jianjie
	    		this.addshetuanform.id   			     = newVal.id
	    		this.addshetuanform.chairManXuehao = newVal.chairmanxuehao?newVal.chairmanxuehao.split(","):null
	    		this.addshetuanform.imageUrl  = newVal.touxiangdizhi?newVal.touxiangdizhi:require('../../assets/img/cardimg.jpg')
	    	},
	    	chairManOptionszi(newVal){
	    		this.chairManOptions = newVal			
	    	}
	    },
    }		
</script>
<style type="text/css">
  #cardcontent{
  	margin: 5px;
  	padding: 10px;
  	background: #EFF3F5;
  	height: 100% !important;
  }
  #cardcontent .card-box{
  	width: 55%;
  }		
	.opacity-layer{
		width:108px;
		height:108px;
		background: rgba(0,0,0,0.5);
		position: absolute;
		border-radius: 50%;
		color: #ffffff;
		line-height: 120px;
	}
	.touxianavater{
		margin-bottom:0 !important; 
	}
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
    border-radius: 50%;
  }

</style>