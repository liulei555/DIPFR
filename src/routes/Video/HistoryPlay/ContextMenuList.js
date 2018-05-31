import { ContextMenu, MenuItem } from 'react-contextmenu';

const ContextMenuList = ({ item }) => {
  return (<ContextMenu id={item.nodeId}>
    <MenuItem>
      刷新
    </MenuItem>
    <MenuItem>
      历史回放
    </MenuItem>
    <MenuItem>
      添加收藏
    </MenuItem>
    <MenuItem>
      标注故障
    </MenuItem>
    <MenuItem>
      设备档案
    </MenuItem>
  </ContextMenu>);
};

export default ContextMenuList;
