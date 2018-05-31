/**
 * 行政区域设备树
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree , Badge,Icon } from 'antd';
import { Link } from 'react-router-dom';

const TreeNode = Tree.TreeNode;

const AreaDeviceTree = ({ location,dispatch, app, ...treeProps }) => {
  const {treeData,onSelect, onLoadData,autoExpandParent,expandedKeys,nodeData,deviceIds} = treeProps;
  console.log(treeData)
  const onExpand = expandedKeys => {
    dispatch({
      type:"bayonetDevice/updateState",
      payload:{
        expandedKeys,
        autoExpandParent: false,
      }
    })
  };
  const onCheck = (checkedKeys,e) => {
    if(e.checked){
      let arrArea = []
      let arrDevice = []
      if(e.checkedNodes.length>0){
        // e.checkedNodes[i].map((item)=>{
        //   console.log(item);
        // })
        for(let i=0;i<e.checkedNodes.length;i++){
          if(e.checkedNodes[i].props.dataRef)
            if(e.checkedNodes[i].props.dataRef.nodeType === 'area'){
              let ret1 = arrArea.find((value, index, arr) => {
                return value.nodeId ===  e.checkedNodes[i].props.dataRef.nodeId
              })
              if(!ret1){
                arrArea.push(e.checkedNodes[i].props.dataRef)
              }
            }else if(e.checkedNodes[i].props.dataRef.nodeType === 'device'){

              let ret2 = arrDevice.find((value, index, arr) => {
                return value.nodeId ===  e.checkedNodes[i].props.dataRef.nodeId
              })
              if(!ret2){
                arrDevice.push(e.checkedNodes[i].props.dataRef)
              }
            }
          dispatch({
            type:'bayonetDevice/updateState',
            payload:{
              nodeData:arrArea,
              deviceIds:arrDevice,
            }
          })
        }
        /*dispatch({
          type:'areaDevice/updateState',
          payload:{
            deviceIds:checkedKeys.checked.join(','),
            areaId:e.checkedNodes[0].props.dataRef.areaId?e.checkedNodes[0].props.dataRef.areaId:e.checkedNodes[0].props.dataRef.nodeId,
            nodeData:e.checkedNodes[0].props.dataRef,
          }
        })*/
      }
    }else{
      let nodeTreeData = []
      let devicesData = []
      for(let i=0;i<e.checkedNodes.length;i++){
        if(e.checkedNodes[i].props.dataRef)
          if(e.checkedNodes[i].props.dataRef.nodeType === 'area'){
            let ret1 = nodeTreeData.find((value, index, arr) => {
              return value.nodeId ===  e.checkedNodes[i].props.dataRef.nodeId
            })
            if(!ret1){
              nodeTreeData.push(e.checkedNodes[i].props.dataRef)
            }
          }else if(e.checkedNodes[i].props.dataRef.nodeType === 'device'){

            let ret2 = devicesData.find((value, index, arr) => {
              return value.nodeId ===  e.checkedNodes[i].props.dataRef.nodeId
            })
            if(!ret2){
              devicesData.push(e.checkedNodes[i].props.dataRef)
            }
          }
        dispatch({
          type:'bayonetDevice/updateState',
          payload:{
            nodeData:nodeTreeData,
            deviceIds:devicesData,
          }
        })
      }
    }

  };

  const renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {//<Icon type="area-chart" />
        return (
          <TreeNode
            title={item.nodeName}
            key={item.nodeId}
            type={item.nodeType}
            dataRef={item}
            icon={() =><span><Icon type={item.nodeType === 'area'? "area-chart":"video-camera" }/><Badge count={item.countTotal} offset={[-8,item.nodeName && item.nodeName.length*16]}/></span>}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={item.nodeName}
        key={item.nodeId}
        type={item.nodeType}
        dataRef={item}
        icon={() => <span><Icon type={item.nodeType === 'area'? "area-chart":"video-camera" }/><Badge count={item.countTotal} offset={[-10,item.nodeName && item.nodeName.length*16]}/></span>}
      />;
    });
  };
  return (
    <div style={{}} className='areaAnd-dev'>
      <Tree
        showIcon
        checkable
        onExpand={onExpand}
        onCheck={onCheck}
        onSelect={onSelect}
        loadData={onLoadData}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        checkStrictly={true}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </div>
  );
};

AreaDeviceTree.propTypes = {
  location: PropTypes.object,
};

export default AreaDeviceTree;
