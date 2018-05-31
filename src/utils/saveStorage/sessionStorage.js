/*get提取key 值 value*/
const getSession=(key)=>{
	if(!window.sessionStorage){
		return console.log("No Get sessionStorage!")
	}
	return window.sessionStorage.getItem(key)
}
/*set存储key：value键值对*/
const setSession=(key,value)=>{
	if(!window.sessionStorage){
		return console.log("No Set sessionStorage!")
	}
	window.sessionStorage.setItem(key,value)
	return console.log("Set Ok!"+value)
}
/*remove删除key 和值 value*/
const remSession=(key)=>{
	if(!window.sessionStorage){
		return console.log("No Rem sessionStorage!")
	}
	window.sessionStorage.removeItem(key)
	return console.log("Rem Ok!"+key)
}

export default {getSession,setSession,remSession}

/*引用方法getSession,setSession,remSession*/