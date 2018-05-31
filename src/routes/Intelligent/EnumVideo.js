/**
 * 功能描述：枚举
 * 2018.04.28
 * 作者：xiongmeng
 */

//任务状态
export const taskStatusEnum = {
  1: '待处理',
  11: '待转码',
  12: '转码中',
  13: '转码完成',
  19: '转码失败',
  21: '待下载',
  22: '下载中',
  23: '下载完成',
  29: '下载失败',
  31: '待分析',
  32: '分析中',
  33: '完成',
  39: '分析失败',
  9: '用户终止',
  99: '删除',
};

export const deleteType = 99;
export const pauseType = 9;
export const createType = 21;

//任务类型
export const taskTypeEnum = {
  15: '视频检索',
};

export const basicPage5 = {
  pageNum: '1',
  pageSize: '5',
};

export const basicPage10 = {
  pageNum: '1',
  pageSize: '10',
};

export const deviceTypeEnum = {
  '4': '卡口',
  '5': '摄像头',
  '14': '硬盘录像机',
  '15': '视频矩阵',
  '3': '3G电警',
};

