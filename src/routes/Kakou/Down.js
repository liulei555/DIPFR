import React from 'react';
import echarts from 'echarts/lib/echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';

const Down = ({}) => {
	let bar_ref;
	const option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar',
				itemStyle:{
					normal:{
						color:'#cc6666'
					}
				},
			},
			{
				data: [60, 100, 75, 40, 35, 55, 65],
				type: 'bar',
				itemStyle:{
					normal:{
						color:'#ffcc66'
					}
				},
			}
		],

	};
	const maychatsAll=[];
	setTimeout(function () {
		maychatsAll[0]=echarts.init(bar_ref);
		maychatsAll[0].setOption(option)
	},1000);
	return (
		<div style={{width:'100%',height:'300px'}}  ref={e=>{bar_ref=e}}>
		</div>
	)
};
export default Down;