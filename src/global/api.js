let nodeApiBaseUrl = '/api';
export const api   ={
	'login':nodeApiBaseUrl+"/users/login",
	'getUserInfo':nodeApiBaseUrl+"/users/getUserInfo",
	'addNewshetuan':nodeApiBaseUrl+"/shetuan/addNewSheTuan",
	'deleteshetuan':nodeApiBaseUrl+"/shetuan/deleteshetuan",
	'getSheTuanList':nodeApiBaseUrl+"/shetuan/getSheTuanList",
	'getTreeListYi':nodeApiBaseUrl+"/shetuan/getTreeListYi",
	'getTreeListEr':nodeApiBaseUrl+"/shetuan/getTreeListEr",
	'getTreeListSan':nodeApiBaseUrl+"/shetuan/getTreeListSan",
	'deletesection':nodeApiBaseUrl+"/shetuan/deletesection",
	'addNewSection':nodeApiBaseUrl+"/shetuan/addNewSection",
	//根据学号获取人员
	'selectPartyChair_api':nodeApiBaseUrl+"/shetuan/selectChairMan",
	//根据学号字符串获取 人员选项列表
	'fengjiexuehaostr':nodeApiBaseUrl+"/shetuan/fengjiexuehaostr",
	//获取当前部门申请人员列表 handleshetuanjoin.vue
	'handleshetuanjoinlist':nodeApiBaseUrl+"/shetuan/handleshetuanjoinlist",
	//获取当前登录人员负责的部门树
	'getfuzerenbumentree':nodeApiBaseUrl+"/shetuan/handlefuzerentree",
	//初审表单上传
	'handlechushenbiaodan':nodeApiBaseUrl+"/shetuan/handlechushenbiaodan",
	//一面表单上传
	'handleyimianbiaodan':nodeApiBaseUrl+"/shetuan/handleyimianbiaodan",	
	//二面表单上传
	'handleermianbiaodan':nodeApiBaseUrl+"/shetuan/handleermianbiaodan",
	//获取社团成员列表 handlepartyrenyuan
	'getbumenchengyuanlist':nodeApiBaseUrl+"/shetuan/getbumenchengyuanlist",		
}