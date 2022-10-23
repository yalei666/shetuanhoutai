<template>
	<div class="app-container">
		<div class="filter-container">
					
		</div>		
		<el-row>
			<el-col :span="3">
				<el-tree 
					:data="bumentreedata"
					empty-text="查询中" 
					@node-click="handleNodeClick">
				</el-tree>	
			</el-col>			
			<el-col :span="19">
			    <el-table
			      :data="tablelist"
			      row-key="id"
			      border	 
			      style="width: 100%"
			      >
			      <el-table-column
			        prop="applystudentname"
			        label="申请人姓名"
			        align="center"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="applystudentclass"
			        label="申请人班级"
			        align="center"
			        >
			      </el-table-column>
			      <el-table-column
			      	prop="joinsectionname"
			      	label="申请加入部门"
			      	align="center"
			      	>	
			      </el-table-column>	
			      <el-table-column
			      	prop="applytime"
			      	label="申请加入时间"
			      	align="center"
			      	>	
			      </el-table-column>
			      <el-table-column
			      	align="center"
			      	label="当前状态"
			      	>	
			      	<template slot-scope="scope">
			      		<el-tag :type="scope.row.statusstyle" effect="dark">
			      			{{scope.row.statustext}}
			      		</el-tag>			
			      	</template>
			      </el-table-column>		      		      			      
			      <el-table-column align="center"  label="操作" >
			          <template slot-scope="scope"> 
						<el-dropdown @command="(val)=>handleCommand(val,scope.row)">
							<el-badge is-dot class="item" :hidden="userInfo.xuehao == scope.row.nextCheckPersonXuehao?false:true ">
							  <el-button type="info">
							    操作<i class="el-icon-arrow-down el-icon--right"></i>
							  </el-button>
							</el-badge>  
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item v-for="(item,index) in scope.row.caozuolistArr" :key="index" :command="item.commandname" size="small">
						    	{{item.caozuoname}}
						    </el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>			    		                
			          </template>
			      </el-table-column> 
			    </el-table>	
				<el-pagination
				 	background
				  	style="margin-top: 15px;"
		      		:current-page="listQuery.currPage"
		      		:page-sizes="[5, 10 , 30, 50 ]"
		      		:page-size="listQuery.pageSize"
		     		@size-change="handleSizeChange"
		      		@current-change="handleCurrentChange"		
		      		layout="total,sizes, prev, pager, next, jumper"        
				  	:total="total">
				</el-pagination>			    							
			</el-col>			
		</el-row>		
		<el-dialog
		  title="处理初审"
		  :visible.sync="chushendialogvisible"
		  width="50%">
		  <el-row>
			<el-col :span="24">
			  <el-descriptions class="margin-top" title="申请信息" :column="3"  border>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-user"></i>
			        用户名
			      </template>
			      {{userInfo.realname}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-school"></i>
			        学号
			      </template>
			      {{userInfo.xuehao}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-location-outline"></i>
			        班级
			      </template>
			      {{userInfo.userclass}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-tickets"></i>
			        申请说明
			      </template>
			      {{nowrow.applytext}}
			    </el-descriptions-item>
			  </el-descriptions>												
			</el-col>					  	
		  </el-row>
		  <el-divider></el-divider>
		  <el-row>
			<el-col :span="24">
				<el-form   :model="chushenform" label-position="top" label-width="240px">
				  <el-form-item label="是否通过初审，进入下一环节" prop="shifoutongguo">
					    <el-radio-group v-model="chushenform.shifoutongguo">
					      <el-radio label="1">通过，进入一面</el-radio>
					      <el-radio label="0">未通过</el-radio>
					    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="说明" prop="shuoming">
				    <el-input 
				    	type="textarea"
				    	v-model="chushenform.shuoming" 
				    	placeholder="如果通过，请告知一面时间地点" 
				    	:autosize="{ minRows: 2, maxRows: 4}">
				    </el-input>
				  </el-form-item>
				</el-form>														
			</el-col>					  	
		  </el-row>		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="chushendialogvisible = false">取 消</el-button>
		    <el-button type="primary" @click="hangdlechushenUp">确 定</el-button>
		  </span>
		</el-dialog>	
		<el-dialog
		  title="处理一面"
		  :visible.sync="yimiandialogvisible"
		  width="50%">
		  <el-row>
			<el-col :span="24">
			  <el-descriptions class="margin-top" title="申请信息" :column="3"  border>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-user"></i>
			        用户名
			      </template>
			      {{userInfo.realname}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-school"></i>
			        学号
			      </template>
			      {{userInfo.xuehao}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-location-outline"></i>
			        班级
			      </template>
			      {{userInfo.userclass}}
			    </el-descriptions-item>
			    <el-descriptions-item>
			      <template slot="label">
			        <i class="el-icon-tickets"></i>
			        申请说明
			      </template>
			      {{nowrow.applytext}}
			    </el-descriptions-item>
			  </el-descriptions>												
			</el-col>					  	
		  </el-row>
		  <el-divider></el-divider>
		  <el-row>
			<el-col :span="24">
				<el-form   :model="yimianform" label-position="top" label-width="240px">
				  <el-form-item label="是否通过一面，进入下一环节" prop="shifoutongguo">
					    <el-radio-group v-model="yimianform.shifoutongguo">
					      <el-radio label="1">通过，进入二面</el-radio>
					      <el-radio label="0">未通过</el-radio>
					    </el-radio-group>
				  </el-form-item>
				  <el-form-item label="说明" prop="shuoming">
				    <el-input 
				    	type="textarea"
				    	v-model="yimianform.shuoming" 
				    	placeholder="如果通过，请告知二面时间地点" 
				    	:autosize="{ minRows: 2, maxRows: 4}">
				    </el-input>
				  </el-form-item>
				</el-form>														
			</el-col>					  	
		  </el-row>		  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="yimiandialogvisible = false">取 消</el-button>
		    <el-button type="primary" @click="hangdleyimianUp">确 定</el-button>
		  </span>
		</el-dialog>				
	</div>	
</template>
<script type="text/javascript">
import {global} from '../../global/global';
import {api} from '../../global/api';		
import { mapGetters } from 'vuex'
  	export default {
	    data() {
	      return {
	      	listQuery:{
	      		currPage:1,
	      		pageSize:10,
	      	},
	      	total:0,
	      	bumentreedata:[],
	      	tablelist:[],
	      	chushendialogvisible:false,
	      	yimiandialogvisible:false,
	      	nowrow:'',
	      	chushenform:{
	      		shifoutongguo:'0',
	      		shuoming:""
	      	},
	      	yimianform:{
	      		shifoutongguo:'0',
	      		shuoming:""	      		
	      	},
	      	nowdata:''
	      };
	    },
	    methods: {
	    	getbumenjoinlist(data){
	    		var that = this 
	    		this.listQuery.role      = this.userInfo.userrole 
	    		this.listQuery.shetuanid = data.id
	    		global.post(api.handleshetuanjoinlist,this.listQuery,function(res){
						var data = res.data 
						if(data.resultCode == 1){
							data.resultData.forEach(function(item,index){
								switch(item.status){
									case 0 :
									item.statustext    = "待初审"
									item.statusstyle   = ''
									item.caozuolistArr = [{commandname:'0',caozuoname:'进行初审'}] 
									break
									case 1 :
									item.statustext = "已完成"
									item.statusstyle = "success"
									item.caozuolistArr = [{commandname:'0',caozuoname:'无'}]
									break
									case 2:
									item.statustext = "未通过"
									item.statusstyle = "danger"
									item.caozuolistArr = [{commandname:'0',caozuoname:'无'}]
									break

									case 3:
									item.statustext = "一面中"
									item.statusstyle = ''
									item.caozuolistArr = [{commandname:'3',caozuoname:'填写一面结果'}]
									break

									case 4:
									item.statustext = "二面中"
									item.statusstyle = ''
									item.caozuolistArr = [{commandname:'4',caozuoname:'填写二面结果'}]
									break									
								}
							})
							that.tablelist = data.resultData
							that.total     = data.total			
						}	    			
	    		})
	    	},
			getfuzeshetuanlist(){
				var studentxuehao = this.userInfo.xuehao
				var that          = this
				global.get(api.getfuzerenbumentree,{'studentxuehao':studentxuehao},function(res){
					var data = res.data
					if(data.resultCode == 1){
						var newArr = []
						data.resultData.forEach(function(item,index){
							var newObj = {}
							newObj.label    = item.shetuanname+"/"+item.bumenname
							newObj.children = []		
							newObj.id       = item.sectionid
							newArr.push(newObj)
						})
						that.bumentreedata = newArr	

					}		
				})
			},
			handleNodeClick(data){
				this.getbumenjoinlist(data)
				this.nowdata = data
			},
			handleSizeChange(val){
        		this.listQuery.pageSize = val;
        		this.getbumenjoinlist();		
			},
			handleCurrentChange(val){
        		this.listQuery.currPage = val
        		this.getbumenjoinlist()
			},	
			handleCommand(val,row){
				this.nowrow = row 
				if(val == 0){
					this.chushendialogvisible = true 
				}else if(val == 3){
					this.yimiandialogvisible = true 
				}
			},
			hangdlechushenUp(){
				var that = this 
				this.chushenform.id       = this.nowrow.id
				this.chushenform.realname = this.userInfo.realname
				this.chushenform.userid   = this.userInfo.id
				global.post(api.handlechushenbiaodan,this.chushenform,function(res){
					var data = res.data
					if(data.resultCode == 1){
						that.$message({
							type:'success',
							message: '处理成功',
						})
						that.chushendialogvisible = false
						that.getbumenjoinlist(that.nowdata);
					}		
				})		
			},
			hangdleyimianUp(){
				var that = this 
				this.yimianform.id       = this.nowrow.id
				this.yimianform.realname = this.userInfo.realname
				this.yimianform.userid   = this.userInfo.id
				global.post(api.handleyimianbiaodan,this.yimianform,function(res){
					var data = res.data
					if(data.resultCode == 1){
						that.$message({
							type:'success',
							message: '处理成功',
						})
						that.yimiandialogvisible = false
						that.getbumenjoinlist(that.nowdata);
					}		
				})		
			},						
		},
	    mounted(){
			this.getfuzeshetuanlist()				    	
	    },
	    computed:{
	    	...mapGetters(
	    		{userInfo:'userInfo'}
	    	)
	    }
 	};	
</script>
<style type="text/css">
.el-table .cell{
	overflow: visible !important;
}
</style>