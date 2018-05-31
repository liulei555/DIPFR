import { Map } from 'react-amap';

const MapTools = (props) => {
  const map = props.__map__;
  let cluster, markers = [];

  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  const _renderCluserMarker = function (context) {
    let factor = Math.pow(context.count/count,1/18)
    let div = document.createElement('div');
    let Hue = 180 - factor* 180;
    let bgColor = 'hsla('+Hue+',100%,50%,0.7)';
    let fontColor = 'hsla('+Hue+',100%,20%,1)';
    let borderColor = 'hsla('+Hue+',100%,40%,1)';
    let shadowColor = 'hsla('+Hue+',100%,50%,1)';
    div.style.backgroundColor = bgColor
    let size = Math.round(30 + Math.pow(context.count/count,1/5) * 20);
    div.style.width = div.style.height = size+'px';
    div.style.border = 'solid 1px '+ borderColor;
    div.style.borderRadius = size/2 + 'px';
    div.style.boxShadow = '0 0 1px '+ shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size+'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new AMap.Pixel(-size/2,-size/2));
    context.marker.setContent(div)
  }
  setTimeout(() => {
    cluster = new window.AMap.MarkerClusterer(map,markers,{
      gridSize:80,
      renderCluserMarker:_renderCluserMarker
    });
  }, 5300)


  return null;
};

export default MapTools
