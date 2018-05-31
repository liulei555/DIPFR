var ipConfig = {
  //图侦平台IP
  "dipfrIp": "172.20.32.77",
  //sip2IP
  "sip2Ip": "172.20.32.59",
  //地图IP
  "mapIp": "172.20.22.43",
  //图像增强ip
  "txzqIp": "172.20.32.84",
  //视频服务ip
  "ocxServerIP": "172.20.32.84",
  "bakServerIP": "127.0.0.1",
}


// var ipConfig = {
//   "dipfrIp": "15.225.15.6",
//   //sip2IP
//   "sip2Ip": "15.225.15.6",
//   //地图IP
//   "mapIp": "15.225.1.33",
//   //图像增强ip
//   "txzqIp": "15.225.1.31",
//   //视频服务ip
//   "ocxServerIP": "15.225.7.9",
//   "bakServerIP": "127.0.0.1",
// }

window['getIp'] = function(type){
  return ipConfig[type]
}
