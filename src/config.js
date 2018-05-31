import getIp from 'getIp';

const hasHeader = 0; // 0 为内页无菜单 1 为内页有菜单

export default {
  hasHeader,
  mapUrl: `http://${getIp('mapIp')}:8080/mapContainer/index.html`,
  ip: `${getIp('dipfrIp')}:10001`,
  serverUrl: `${getIp('sip2Ip')}`,
  sip2Ip: `${getIp('sip2Ip')}:9090`,
  systemRouter: `http://${getIp('dipfrIp')}:8000/#`,
  imgIp: `http://${getIp('dipfrIp')}:8001`,
  txzqIp: `http://${getIp('txzqIp')}:8080/txzqserver/txzq/index?url=`,
  ocxServerIP: `${getIp('ocxServerIP')}`,
  bakServerIP: `${getIp('bakServerIP')}`,
}
