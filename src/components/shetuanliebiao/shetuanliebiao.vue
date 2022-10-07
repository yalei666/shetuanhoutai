<template>
	<div class="app-container">
		<div class="filter-container">
			<el-row>
				<el-col :span="22">
					<el-input
						placeholder="请输入社团名称"
						v-model="listQuery.canshu">
					</el-input>		
					<el-button type="primary" >搜索</el-button>			
				</el-col>	
				<el-col :span="1">
					<el-button type="primary" @click="handleadd">添加新社团</el-button>			
				</el-col>	
			</el-row>					
		</div>
		<el-table
			ref="shetuanList"
			:data="listData"
			stripe
			highlight-current-row
			style="width: 100%">
			<el-table-column	
				align="center" 
				fixed 
				type="index" 
				width="50" 
				label="序号">	
			</el-table-column>
			<el-table-column
				property="name"
				label="社团名称">
			</el-table-column>	
			<el-table-column
				property="biaoyu"
				label="社团标语">
			</el-table-column>
			<el-table-column
				property="jianjie"
				label="社团简介">
			</el-table-column>
			<el-table-column
				property="touxiangUrl"
				label="社团头像">
				<template slot-scope="scope">
					<img :src="scope.row.touxiangdizhi" style="width:30px;height: 30px;">
				</template>
			</el-table-column>
			<el-table-column
				property="chuangjianshijian"
				label="社团创建时间">
			</el-table-column>
      <el-table-column align="center"  label="操作" >
        <template slot-scope="scope">               
          <el-button size="small" type="primary" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
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
		<xinzengshetuan :fushetuanxianshi="xiugaiVisible" :shetuaninfo="fushetuaninfo" @child-event-show="kongzhixianyin" @child-event-get="getList" :chairManOptionszi="chairmanoptionsfu"></xinzengshetuan>					
	</div>		
</template>	
<script type="text/javascript">
	import {global} from '../../global/global';
	import {api} from '../../global/api';
	import xinzengshetuan  from '../shetuanguanli/xinzengshetuan.vue'	
	export default{
		components:{xinzengshetuan},
		data(){
			return{
				listQuery:{
					canshu:'',
 					currPage: 1,
          pageSize: 10,
				},
				total:null,
				listData:[],
				xiugaiVisible:false,
				fushetuaninfo:{
					name      : null,
					biaoyu		     : null,
					shuyu			     : null,
					jianjie        : null,
					imageUrl       : null,
					id             : null,
					chairmanxuehao : null       
				},
				chairmanoptionsfu:[]			
			}
		},
		methods:{
			getList(){
				var that = this
				global.post(api.getSheTuanList,this.listQuery,function (res){
					var data = res.data
					if(data.resultCode == 1){
						that.listData = data.resultData
						that.total    = data.total
					}
				})		
			},
			handleSizeChange(val){
        this.listQuery.pageSize = val;
        this.getList();		
			},
			handleCurrentChange(val){
        this.listQuery.currPage = val;
        this.getList();
			},
			handleEdit(row){
				var that = this 
				global.get(api.fengjiexuehaostr,{'xuehaostr':row.chairmanxuehao},function(res){
					var data = res.data
					if(data.resultCode == 1){
						that.chairmanoptionsfu = data.resultData
					}else{
						that.chairmanoptionsfu = []
					}					
				},function(rej){
					console.log(chairmanoptionsfu)
				}) 
				this.xiugaiVisible = true
				this.fushetuaninfo = row
			},
			kongzhixianyin(data){
				this.xiugaiVisible = false
			},
			handleadd(){
				this.xiugaiVisible = true		
				this.fushetuaninfo = {
					name      : null,
					biaoyu		     : null,
					shuyu			     : null,
					jianjie        : null,
					imageUrl       : null,
					id             : null,
					chairmanxuehao : null
				}				
			},
			handleDelete(row){
				var that = this 
				global.get(api.deleteshetuan,{id:row.id},function(res){
					var data = res.data
					if(data.resultCode == 1){
						that.$message({
			          message: res.data.resultMsg,
			          type: 'success'							
						})						
						that.getList()
					}
				})				
			}
		},
		mounted(){
			this.getList()
		}
	}	
</script>
<style type="text/css">
	.filter-container .el-input{
		width: 15%;
		margin-right: 20px;
	}	
</style>