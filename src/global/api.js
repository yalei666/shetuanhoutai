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
	'fengjiexuehaostr':nodeApiBaseUrl+"/shetuan/fengjiexuehaostr"
}