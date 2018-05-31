const level = 100
const max = 100*level;
const levelNum = [4*level,8*level,9*level];
let key = 1;
const rootId =  Math.ceil(Math.random() * 10000)

let treeData = [
  {
    "key": rootId,
    "level": 0,
    "id": rootId,
    "pid": 'root',
    "checked":false,
    "chkDisabled":false,
    "hidden":false,
    "isParent":true,
    "title":"root",
    "nocheck":false,
    "open":false,

  }
];

const creatTree = (node) => {
  let level = node.level + 1;
  let num = levelNum.sort(() => Math.random() - .5);
  if(key > max) return
  for (let i = 0; i < num[0]; i++) {
    key++;
    if(key > max) return
    treeData.push({
      "key": key,
      "level": level,
      "id": `id_${key}`,
      "pId": node.id,
      "checked": false,
      "chkDisabled": false,
      "hidden": false,
      "isParent": true,
      "title": `第${level}_${key}`,
      "nocheck": false,
      "open": false
    })
  }

  for (let i = 0; i < num[0]; i++) {
    creatTree(treeData[key-i-1])
  }
}

// creatTree(treeData[0]);


function addNode(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const body = (b && b.body) || req.body;
  const {method, no, description } = body;
  if (!body.level) {
    res.json({message: 'level必须存在'});
  }
  if (!body.pid) {
    res.json({message: 'pid必须存在'});
  }
  console.log(1)
  switch (req.method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      treeData = treeData.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'POST':
      const i = Math.ceil(Math.random() * 10000);
      treeData.unshift({
        key: i,
        id: i,
        ...body
      });
      break;
    default:
      break;
  }

  if (res && res.json) {
    res.json(treeData);
  } else {
    return [];
  }
}

export default {
  treeData,
  addNode
};
