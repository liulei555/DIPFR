import {Tree, Icon, Badge} from 'antd';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import ContextMenuList from './ContextMenuList';

const TreeNode = Tree.TreeNode;
import * as styles from './index.less';

const List = ({dispatch, ...treeProps}) => {
  const {onExpand,onSelect, onChange, treeData, onLoadData, checkable, defaultExpandAll, expandedKeys} = treeProps;

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode
            title={item.countTotal ? `${item.nodeName}[${item.countTotal}|${item.countNormal}|${item.countFault}]` : item.nodeName || '无名称' || '无名称'}
            key={item.nodeId}
            dataRef={item}
            icon={() => {
              {
                return item.deviceNumber ?
                  <span className={'icon-Police-t icon-Road'}
                        offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe901;</span> :
                  <span className={'icon-Police-t icon-Road'}
                        offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>
              }
            }}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        title={
          <ContextMenuTrigger id={item.nodeId}>
            {item.countTotal ? `${item.nodeName}[${item.countTotal}|${item.countNormal}|${item.countFault}]` : item.nodeName || '无名称'}
            <ContextMenuList
              item={{nodeId: item.nodeId}}
              dispatch={dispatch}/>
          </ContextMenuTrigger>
        }
        key={item.nodeId}
        dataRef={item}
        icon={() => {
          {
            return item.deviceNumber ?
              <span className={'icon-Police-t icon-Road'}
                    offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe901;</span> :
              <span className={'icon-Police-t icon-Road'}
                    offset={[-10, item.nodeName && item.nodeName.length * 16]}>&#xe907;</span>
          }
        }}
      />;
    });
  }
  const onCheck = checkedKeys => {
    // console.log('onCheck', checkedKeys);
  };
  return (<div className={styles.list}>
      <div className={styles.tree}>
        <Tree
          showIcon
          defaultExpandAll={defaultExpandAll}
          onExpand={onExpand}
          onCheck={onCheck}
          onSelect={onSelect}
          onChange={onChange}
          loadData={onLoadData}
          {...treeProps}
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </div>
    </div>
  )
}

export default List;
