#request

#axios数据连接方法，目前提供GET,POST两种请求方式

页面引用：
import { getUtil, postUtil } from 'utils/request/request';
getUtil(url,params)
	url:"http://api.com"   type:String  //api接口
	params:{key:value}	   type:Array   //显性传值，数据量不宜超大
postUtil(url,params,data)
	url:"http://api.com"   type:String  //api接口
	params:{key:value}	   type:Array   //显性传值，数据量不宜超大
	data:{key:value}	   type:Array   //隐式传值，可传递大量数据

返回方式：
 return Promise.resolve({
	      success: true,			type:Boolean   //回传成功true失败
	      message: statusText,		type:String	   //后台回传数据
	      statusCode: status,		type:Number	   //回传数值，判断状态
	      ...data,					type:Array	   //回传data，并展开
	    })

以上为demo回传方式，经测试可以得到demo mock数值。
Update time:2017.10.28   author:'韩爽'   e-mail:hanshuang@sit.com.cn
