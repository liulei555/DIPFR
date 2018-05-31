import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import style from './index.less'
const LeftOn = () => {
	let bar_ref;
	let bar_ref1;
	const option = {
    title: {
      text: '今日流入',
      subtext: '2342',
      textStyle: {
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        fontWeight: 'normal',
      },
      subtextStyle: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'normal',
        fontFamily: 'Microsoft YaHei',
        fontSize: 20,
      },
      itemGap: 5,
      x: 'center',
      y: 70
    },
		series: [
			{
				name:'访问来源',
				type:'pie',
				radius: ['60%', '90%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				itemStyle:{
					normal:{
						color:(params) => {
							return ['#cc6666','#ffcc66'][params.dataIndex%10]
						}

					}
				},
				data:[
					{value:600, name:'沪牌'},
					{value:400, name:'外牌'},
				]
			}
		]
	};
	const option1 = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		/*legend: {
			orient: 'vertical',
			x: 'left',
			data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		},*/
		series: [
			{
				name:'访问来源',
				type:'pie',
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				itemStyle:{
					normal:{
						color:(params) => {
							return ['#cc6666','#ffcc66'][params.dataIndex%10]
						}

					}
				},
				data:[
					{value:600, name:'沪牌'},
					{value:400, name:'外牌'},
				]
			}
		]
	};
	const maychatsAll=[];
	setTimeout(function () {
		maychatsAll[0]=echarts.init(bar_ref);
		maychatsAll[0].setOption(option)
		// maychatsAll[1]=echarts.init(bar_ref1);
		// maychatsAll[1].setOption(option1)

	},1000);

	return (
		<div className={style.leftOn} >
      <div className={style.left} >
        <div className={style.bar} ref={e=>{bar_ref=e}}></div>
      </div>
      <div className={style.left} >
        <div className={style.bar} ref={e=>{bar_ref=e}}></div>
      </div>

			{/*<div style={{position:'absolute',right:'18%',top:'35%',fontSize:'12px'}}>今日流出</div>*/}

			{/*</div>*/}
			{/*<div style={{position:'absolute',left:'44%',top:'30%'}}>*/}
				{/*<div style={{background:'#cc6666',width:'40px',height:'10px',borderRadius:'5px'}}/>*/}
				{/*<div style={{fontSize:'16px'}}>沪牌</div>*/}
				{/*<div style={{background:'#ffcc66',width:'40px',height:'10px',borderRadius:'5px',marginTop:30}}/>*/}
				{/*<div style={{fontSize:'16px'}}>外牌</div>*/}
			{/*</div>*/}
			<div style={{width:'50%',height:'200px'}}  ref={e=>{bar_ref1=e}}></div>
		</div>
	);
};
export default LeftOn;
