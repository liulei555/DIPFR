import React from 'react';

const CarDetail = ({}) => {
  return (
    <div>
      <div>
        <img alt={'image'} src='../../../public/images/image_usr.png'
             style={{ width: '100%', height: '150px' }}/>
      </div>
      <div className='table-car'>
        <table width='100%'>
          <tbody>
          <tr>
            <td>号牌号码：</td>
            <td>陕A 88888</td>
          </tr>
          <tr>
            <td>号牌种类：</td>
            <td></td>
          </tr>
          <tr>
            <td>号牌颜色</td>
            <td></td>
          </tr>
          <tr>
            <td>车辆品牌：</td>
            <td></td>
          </tr>
          <tr>
            <td>车辆子品牌：</td>
            <td></td>
          </tr>
          <tr>
            <td>车型：</td>
            <td></td>
          </tr>
          <tr>
            <td>车身颜色：</td>
            <td></td>
          </tr>
          <tr>
            <td>挂件：</td>
            <td></td>
          </tr>
          <tr>
            <td>餐巾盒：</td>
            <td></td>
          </tr>
          <tr>
            <td>年检标签：</td>
            <td></td>
          </tr>
          <tr>
            <td>打电话：</td>
            <td></td>
          </tr>
          <tr>
            <td>主驾安全带：</td>
            <td></td>
          </tr>
          <tr>
            <td>副驾安全带：</td>
            <td></td>
          </tr>
          <tr>
            <td>主驾遮阳板：</td>
            <td></td>
          </tr>
          <tr>
            <td>副驾遮阳板：</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="2" className={'cut-line'}>
              <hr />
            </td>
          </tr>
          <tr>
            <td>行驶速度：</td>
            <td></td>
          </tr>
          <tr>
            <td>行驶方向：</td>
            <td></td>
          </tr>
          <tr>
            <td>行驶车道：</td>
            <td></td>
          </tr>
          <tr>
            <td>经过时间：</td>
            <td></td>
          </tr>
          <tr>
            <td>经过地址：</td>
            <td></td>
          </tr>
          <tr>
            <td>黄标车：</td>
            <td></td>
          </tr>
          <tr>
            <td>危险用车：</td>
            <td></td>
          </tr>
          <tr>
            <td>来源标识：</td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarDetail;
