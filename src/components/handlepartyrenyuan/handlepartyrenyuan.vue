<template>
	<div class="app-container">
		<div class="filter-container">
			<el-row>
				<el-col :span="22">
					<el-input
						placeholder="请输入姓名"
						v-model="listQuery.canshu">
					</el-input>		
					<el-button type="primary" >搜索</el-button>			
				</el-col>	
			</el-row>							
		</div>
		<el-row>
			<el-col :span="3">
				<el-tree 
					:data="bumentreedata" 
					@node-click="handleNodeClick">
				</el-tree>	
			</el-col>			
			<el-col :span="19">
			    <el-table
			      :data="tableData"
			      row-key="id"
			      border	
			      style="width: 100%">
			      <el-table-column
			        prop="bumenname"
			        label="部门名称"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="xueshengname"
			        label="学生名称"
			        >
			      </el-table-column>
			      <el-table-column
			      	prop="xueshengbanji"
			      	label="学生班级"
			      	>	
			      </el-table-column>	
			      <el-table-column
			      	prop="xuehao"
			      	label="学生学号"
			      	>	
			      </el-table-column>		      			      
	<!-- 		      <el-table-column align="center"  label="操作" >
			      </el-table-column>  -->
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
	</div>	
</template>
<script type="text/javascript">
	import {global} from '../../global/global';
	import {api} from '../../global/api';
	import { mapGetters } from 'vuex'	
	export default{
		data(){
			return {
		      	listQuery:{
		      		currPage:1,
		      		pageSize:10,
		      		canshu:''
		      	},
		      	total:0,
		      	bumentreedata:[],
		      	tableData:[],
		      	nowdata:''		      	
			}
		},
		methods:{
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
				this.nowdata = data
				this.getrenyuantabledata()
			},
			handleSizeChange(val){
        		this.listQuery.pageSize = val;
        		this.getrenyuantabledata();		
			},
			handleCurrentChange(val){
        		this.listQuery.currPage = val
        		this.getrenyuantabledata()
			},
			getrenyuantabledata(){
				var that = this 
				this.listQuery.sectionid = this.nowdata.id
				global.post(api.getbumenchengyuanlist,this.listQuery,function(res){
		    		var data = res.data 
		    		if(data.resultCode == 1){
		    			that.total     = data.resultData[1][0].total
		    			that.tableData = data.resultData[0]
		    		}					
				})				
			}			
		},
	    mounted(){
			this.getfuzeshetuanlist()				    	
	    },
	    computed:{
	    	...mapGetters(
	    		{userInfo:'userInfo'}
	    	)
	    }
	}	
</script>
<style type="text/css">
	
</style>