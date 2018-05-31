import React from 'react';
import echarts from 'echarts'; //必须
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
const CenterUp = ({}) => {
	let line_ref;
	const option = {
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22','23','24']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line',
				areaStyle: {
					normal:{
						color:'red'
					}
				}
			},
			{
				data: [430, 820, 599, 1204, 1111],
				type: 'line',
				areaStyle: {
					normal:{
						color:'#ffcc66'
					}
				}
			}
		]
	};

	const maychatsAll=[];
	setTimeout(function () {
		maychatsAll[0]=echarts.init(line_ref);
		maychatsAll[0].setOption(option);
	},1000);
	return (
		<div>
			<div style={{width:'100%',height:'200px'}}  ref={e=>{line_ref=e}}>
			</div>
		</div>
	)
};
export default CenterUp;
