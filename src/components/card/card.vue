<template>
  <div class="card">
    <div class="card-box" >
      <div class="card-img">
        <router-link to="#"  class="card-img-hover">
           <img :src="datalist.imageUrl?datalist.imageUrl:morenObj.imageUrl">
        </router-link>  
      </div>        
      <div class="card-info">
        <p class="card-info-title">
            {{datalist.mingcheng?datalist.mingcheng:morenObj.mingcheng}}
        </p>
        <p class="card-info-type">
            {{datalist.shuyu?datalist.shuyu:morenObj.shuyu}}
        </p>  
        <p class="card-info-item">
          <span class="iconfont icon-chakan">
            0
          </span>           
          <span class="iconfont icon-31dianzan">
            0    
          </span>   
        </p>  
      </div>        
      <div class="card-item">
      <p>
        {{datalist.biaoyu?datalist.biaoyu:morenObj.biaoyu}}
      </p>        
      </div>        
    </div>    
  </div>
</template>
<script type="text/javascript">	
	export default{
    props:['datalist'],
		data(){
			return{
        morenObj:{
          imageUrl:require('../../assets/img/cardimg.jpg'),
          mingcheng:'社团名称',
          shuyu:'社团属于',
          biaoyu:'社团标语社团标语'    
        }            
			}
		},
		methods:{
		},
    mounted(){
      console.log(this.shetuanlist);
    },
    watch:{
      datalist(newVal){
        this.morenObj.mingcheng = newVal.mingcheng
        this.morenObj.biaoyu    = newVal.biaoyu
        this.morenObj.shuyu     = newVal.shuyu
        this.morenObj.jianjie   = newVal.jianjie
        this.morenObj.imageUrl  = newVal.touxiangdizhi?newVal.touxiangdizhi:require('../../assets/img/cardimg.jpg')        
      }     
    }
	};
</script>
<style type="text/css">
  .card-item{
  	padding:0 16px;
  	align-items: center;
  	height: 30px;
  	line-height: 30px;
  	position: relative;
  }
	@media screen and (max-width: 1600px){
		.card-box{
			width:210px;
		}		
	}
  .card{
    overflow: hidden;
  }
	.card-box{
		float: left;
		position: relative;
		background-color: #fff;
		border-radius: 4px;
		margin:0 44px 20px 0;
    width: 25%;
	}


  .card-box .card-img{
 		position: relative;
 		border-radius: 4px 4px 0 0;
  }
  .card-img-hover img:hover{
  	opacity: .8;
  }
  .card-box .card-img a img{
  	vertical-align: middle;
  	border:none;
  	border-radius: 4px 4px 0 0;
  	transition: .1s linear;
  	display: block;
    width: 100%;
  }
  .card-box .card-info{
  	border-bottom:1px solid #eee;
  }
  .card-box .card-info{
  	padding:11px 16px 13px;
  	height: 75px;
  	position: relative;
  	box-sizing: content-box;
  }
  .card-box .card-info .card-info-title{
  	margin-bottom:1px;
  	position:relative;
  	height: 20px;
  	line-height: 20px;
  	white-space: nowrap;
  	text-overflow: ellipsis;
  	overflow: hidden;
  }
  .card-box .card-info .card-info-title .title-content{
  	width: 178px;
  	display: inline-block;
  	float: left;
  	vertical-align: center;
  	white-space: nowrap;
  	text-overflow: ellipsis;
  	overflow: hidden;
  }
  .card-box .card-info .card-info-title a{
  	font-size: 14px;
  	color:#333;
  }
  .card-box .card-info .card-info-type{
  	font-size: 12px;
  	color:#bbb;
  	margin-bottom: 17px;
  	height: 18px;
  }
  .card-box .card-info .card-info-item{
  	font-size: 12px ;
  	color: #bbb;
  }
  .card-box .card-info .card-info-item .iconfont{
  	font-size: 12px ;
  }
	.card-box .card-info .card-info-item span[class^=iconfont]{
		margin-right:7px;
		cursor: default;
	}
</style>