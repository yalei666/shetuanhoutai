<template>
	<div class="app-container">
		<el-row>
			<el-col>
				<el-table
					:data="tablelist"
					border
					style="width:100%"
					>
					<el-table-column
						prop="name"
						label="名称"
						align="center"
						>
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						>
						<template slot-scope="scope">
							<div v-if="scope.row.cengji == 0">
								<el-button type="primary" @click="handlealledit(scope.row)">编辑</el-button>	
								<el-button type="primary" >增加下级学院</el-button>
							</div>							
						</template>
					</el-table-column>						
				</el-table>
			</el-col>
		</el-row>
		<el-dialog
			title="编辑"
			:visible.sync="editdialogvisible"
			width="30%"
			>
			<el-form
				:model="editform" 
				>
				  <el-form-item label="名称" prop="name">
				  	<el-input v-model="editform.name" style="width:250px"></el-input>
				  </el-form-item>				
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editdialogvisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleeditupload">确 定</el-button>
		  </span>			
		</el-dialog>
	</div>	
</template>
<script type="text/javascript">
import {global} from '../../global/global';
import {api} from '../../global/api';		
import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				tablelist:[],
				editdialogvisible:false,
				editform:{
					name:''
				},
				nowrow:null
				// listQuery:{
				// 	pageSize:10,
				// 	currPage:1
				// },
				// total:null
			}
		},
		methods:{
			getList(){
				var that = this
				global.post(api.getbanjilistyiji,[],function(res){
					var data = res.data
					if(data.resultCode == 1){
						var listArr = data.resultData[0][0]
						listArr.hasChildren == true
						listArr.children    = []
						data.resultData[1].forEach(function(item,index){
							item.children = []
							item.hasChildren = true
							listArr.children.push(item)
						})
						that.tablelist = [listArr]
					}
				})
			},
			handlealledit(row){
				this.editdialogvisible = true
				this.editform.name     = row.name
				this.nowrow            = row
			},
			handleeditupload(){
				var that = this
				global.get(api.editbanjiname,{id:this.nowrow.id,newname:this.editform.name},function(res){
					var data = res.data
					if(data.resultCode ==1 ){
						that.$message({
							type:'success',
							message: '处理成功',
						})
						that.nowrow = null
						that.editform.name = ''
						that.editdialogvisible = false
						that.getList()
					}
				})		
			}
		},
		mounted(){
			this.getList();
		}
	}
</script>
<style type="text/css">
	
</style>