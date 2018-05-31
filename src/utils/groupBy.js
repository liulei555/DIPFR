export default function groupBy(rows, parent_id) {
  // 判断传入的父类ID是否在数组里面
  function exists(rows, parent_id) {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === parent_id) return true;
    }
    return false;
  }

  let nodes = [];
  // 获取所有一级分类
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    if (!exists(rows, row.parent_id)) {
      nodes.push({
        id: row.id,
        text: row.name,
      });
    }
  }

  // 将一级分类放入待处理数组中
  let toDo = [];
  for (let i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }
  while (toDo.length) {
    // 逐个弹出
    let node = toDo.shift();
    // 查找它的下级分类
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      // 如果是它的下级分类则放入 children 数组中
      if (row[parent_id] == node.id) {
        let child = { id: row.id, text: row.name };
        if (node.children) {
          node.children.push(child);
        } else {
          node.children = [child];
        }
        // 将当前分类放入待处理数组中
        toDo.push(child);
      }
    }
  }
  return nodes;
}
