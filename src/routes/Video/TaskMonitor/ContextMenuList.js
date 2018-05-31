import { ContextMenu, MenuItem } from 'react-contextmenu';

const ContextMenuList = ({ item , dispatch}) => {
  return (<ContextMenu id={item.nodeId}>
    <MenuItem onClick={() => dispatch({type: 'taskMonitor/save', payload: {visible: true}})}>
      查看详情
    </MenuItem>
  </ContextMenu>);
};

export default ContextMenuList;
