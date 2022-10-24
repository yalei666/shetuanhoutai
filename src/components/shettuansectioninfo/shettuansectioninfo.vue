<template>
	<div class="app-container">
		<div class="filter-container">
			<el-row>
				<el-col :span="22">
					<el-input
						placeholder="请输入部门名称">
					</el-input>		
					<el-button type="primary" >搜索</el-button>			
				</el-col>	
			</el-row>					
		</div>		
		<el-row>
			<el-col :span="3">
				<el-tree 
					:data="shetuanListdata" 
					:props="defaultProps" 
					@node-click="handleNodeClick">
				</el-tree>	
			</el-col>			
			<el-col :span="19">
		    <el-table
		      :data="tableData"
		      row-key="id"
		      border		  
		      lazy 
		      style="width: 100%"
		      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
		      <el-table-column
		        prop="name"
		        label="部门名称"
		        >
		      </el-table-column>
		      <el-table-column
		        prop="chuangjianshijian"
		        label="创建时间"
		        >
		      </el-table-column>
		      <el-table-column
		      	prop="chairman"
		      	label="现任负责人"
		      	>	
		      </el-table-column>				      
		      <el-table-column align="center"  label="操作" >
		        <template slot-scope="scope">  
		        	<div v-if="scope.row.cengji == 1">
			          <el-button size="small" type="primary" @click="handleaddsection(scope.row)" icon="el-icon-plus">新增下级部门</el-button>			  
		        	</div>             
		        	<div v-else-if="scope.row.cengji == 2">
		        		<el-button size="small" type="primary" @click="handleAddGroup(scope.row)" icon="el-icon-plus">新增下级小组</el-button>	 
			          <el-button size="small" type="primary" @click="handleEdit(scope.row)"      icon="el-icon-edit">编辑</el-button>
			          <el-button size="small" type="danger"  @click="handleDelete(scope.row)"    icon="el-icon-delete">删除</el-button>
		        	</div>             
		        	<div v-else="scope.row.cengji == 3">
			          <el-button size="small" type="primary" @click="handleEdit(scope.row)"     icon="el-icon-edit">编辑</el-button>
			          <el-button size="small" type="danger"  @click="handleDelete(scope.row)"   icon="el-icon-delete">删除</el-button>	
		        	</div>             
		       </template>
		      </el-table-column> 
		    </el-table>								
			</el-col>			
		</el-row>
		<el-dialog :visible.sync="xiugaiVisible">
		  <el-form :model="sectionform" label-width="90px"  ref="sectionform">
		    <el-form-item label="部门名称">
		      <el-input v-model="sectionform.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="部门负责人" prop="chairman">
				  <el-select 
				  	v-model="sectionform.chairManXuehao" 
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
		    <el-form-item label="部门头像" class="touxianavater" >
				<el-upload
				  class="avatar-uploader"
				  action="#"
				  :show-file-list="false"
				  accept="image/png,image/gif,image/jpg,image/jpeg"
				  :on-change="handlefilechange"
				  :auto-upload="false"
				  >
				  <div class="opacity-layer" :class="{hide:xianshi}">修改头像</div>
				  <img :src="sectionform.imageUrl" class="avatar" @mouseover="xianshi = false" @mouseout="xianshi = true">
				</el-upload>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="handlesectionupload" :disabled="tijiao_button_status" :loading="tijiao_button_status">确 定</el-button>
		    <el-button>取 消</el-button>
		  </div>					
		</el-dialog>											
	</div>	
</template>
<script type="text/javascript">
import {global} from '../../global/global';
import {api} from '../../global/api';		
  	export default {
	    data() {
	      return {
	      	formdata:new FormData(),
	        shetuanListdata: [],
	        defaultProps: {
	          label: 'name'
	        },
	        tableData:  [ ],
	        xiugaiVisible:false,
	        sectionform:{
	        	chairManXuehao:null,
	        	name:'',
	        	imgaddress:this.nowimageaddress?this.nowimageaddress:require('../../assets/img/touxiang.jpg'),
	    			shetuanImgUrl:'',
	    			id:null,	        	
	        },
	        xianshi:true, 
	        nowshetuannode:null,
	        nowimageaddress:null,
	        tijiao_button_status:false,
	        loading:false,
	        chairManOptions:[]
	      };
	    },
	    methods: {
	        getPartyTree(){
		      	var that = this 
			    	global.get(api.getTreeListYi,{},function(res){
			    		var data1 = res.data 
			    		if(data1.resultCode == 1){
			    			that.shetuanListdata = data1.resultData
			    		}
			    	})  	
	        },
	        handleNodeClick(data) {
	        	this.nowshetuannode = data
	        	this.tableData      = []
		      	var that = this 
			    	global.get(api.getTreeListEr,{id:data.id},function(res){
			    		var data = res.data 
			    		if(data.resultCode == 1){
			    			for (var item of data.resultData){
			    				item.cengji = 2
			    				item.hasChildren = Boolean(item.hasChildren)
			    			}
			    			that.tableData.push({id:that.nowshetuannode.id,name:that.nowshetuannode.name,chuangjianshijian:that.nowshetuannode.chuangjianshijian,cengji:1,chairman:that.nowshetuannode.chairman,children:data.resultData })
			    		}
			    	}) 	        
	        },
					handleaddsection(){
						this.xiugaiVisible = true		
						this.sectionform   = {
							name : null,
							imageUrl  : require('../../assets/img/touxiang.jpg'),
							shetuanImgUrl :null,
							id:null,
							chairManXuehao:null
						}						
					},	
					handleAddGroup(){

					},        
					handleEdit(row){
						this.xiugaiVisible = true 
						this.fushetuaninfo = row
					},
					handleDelete(row){
						var that = this 
						global.get(api.deletesection,{id:row.id},function(res){
							var data = res.data
							if(data.resultCode == 1){
								that.$message({
					          message: res.data.resultMsg,
					          type: 'success'							
								})						
								that.getList()
							}
						})				
					},
					handlefilechange(file,filelist){
						this.formdata.append('file',file.raw);
						var _this  = this;
						var event  = event || window.event;
						var file   = event.target.files[0];
						var reader = new FileReader();
						reader.onload = function(e){
							_this.sectionform.imageUrl      = e.target.result
							_this.sectionform.shetuanImgUrl = e.target.result
						}
						reader.readAsDataURL(file)
					},
					handlesectionupload(){
						var that = this;
						that.tijiao_button_status = true
						this.formdata.append('name',this.sectionform.name)
						this.formdata.append('id',this.sectionform.id)
						this.formdata.append('partyid',this.nowshetuannode.id)
						this.formdata.append('chuangjianshijian',this.getNowFormatDate())
						this.formdata.append('chairmanxuehao',this.sectionform.chairManXuehao)
						this.$refs['sectionform'].resetFields()
						global.post(api.addNewSection,this.formdata,function(res){	
							that.formdata = new FormData();
							that.sectionform.imageUrl      = require('../../assets/img/touxiang.jpg') 
							that.sectionform.shetuanImgUrl = ''
							if(res.data.resultCode == 1){
								that.tijiao_button_status = false			
								that.$message({
					          message: res.data.resultMsg,
					          type: 'success'							
								})
								that.handleNodeClick(that.nowshetuannode)	
								that.xiugaiVisible = false			
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
					getNowFormatDate(){
						let date = new Date(),
							year    = date.getFullYear(),
							month   = date.getMonth()+1,
							strDate = date.getDate()
						month   = month>=1   &&	month<=9 ? '0'+month:month
						strDate = strDate>=1 &&	strDate<=9 ? '0'+strDate:strDate
						return year+'-'+month+'-'+strDate
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
	    mounted(){
				this.getPartyTree()    	
	    }
 	};	
</script>
<style type="text/css">
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