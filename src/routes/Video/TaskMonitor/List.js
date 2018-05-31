import { Tree, Button, Icon} from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ContextMenuList from './ContextMenuList';
const TreeNode = Tree.TreeNode;

const List = ({styles, dispatch}) => {
  const treeData = [{
      title: '0-0-0',
      key: '0-0-0',
      children: [
        { title: '0-0-0-0', key: '0-0-0-0' },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' },
      ],
    }, {
      title: '0-0-1',
      key: '0-0-1',
      children: [
        { title: '0-0-1-0', key: '0-0-1-0' },
        { title: '0-0-1-1', key: '0-0-1-1' },
        { title: '0-0-1-2', key: '0-0-1-2' },
      ],
    }, {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ]}];

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={<ContextMenuTrigger id={item.key}>{item.title}<ContextMenuList item={{nodeId: item.key}} dispatch={dispatch} /> </ContextMenuTrigger>} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} dataRef={item} />;
    });
  }

  return (<div className={styles.list}>
      <div className={styles.title}>任务列表</div>
      <div className={styles.tree}>
        <Tree
          checkable
        >
          {renderTreeNodes(treeData)}
        </Tree>
      </div>
      <div className={styles.option}>
        <Button><Icon type="caret-right" />单点播放</Button>
        <Button><Icon type="caret-right" />多点播放</Button>
        <Button><Icon type="caret-right" />轮训播放</Button>
      </div>
    </div>
  )
}

export default List;
