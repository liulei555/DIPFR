const getLocal=(key)=>{
	if(!window.localStorage){
		return console.log("No Get localStorage!")
	}
	return window.localStorage.getItem(key)
}
const setLocal=(key,value)=>{
	if(!window.localStorage){
		return console.log("No Set localStorage!")
	}
	window.localStorage.setItem(key,value)
	return console.log("Set Ok!"+value)
}
const remLocal=(key)=>{
	if(!window.localStorage){
		return console.log("No Rem localStorage!")
	}
	window.localStorage.removeItem(key)
	return console.log("Rem Ok!"+key)
}

export default {getLocal,setLocal,remLocal}