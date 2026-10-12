// 从 data.js 引入任务数组和 ID 生成函数
const { tasks, nextTaskId } = require('./data');

// 创建任务
function createTask(userId, { title, done = false }) {
  // 标题不能为空
  if (!title) throw new Error('标题不能为空');

  // 构造任务对象，包含自增 ID、所属用户、标题、完成状态、创建时间
  const task = { id: nextTaskId(), userId, title, done, createdAt: new Date() };

  // 存入内存数组
  tasks.push(task);

  // 返回新任务
  return task;
}

// 列出任务，支持按完成状态过滤、分页
function listTasks(userId, { done, page = 1, limit = 10 }) {
  // 先筛选出属于当前用户的任务
  let result = tasks.filter(t => t.userId === userId);

  // 如果传入了 done 参数，按完成状态过滤
  if (done !== undefined) result = result.filter(t => t.done === done);

  // 按创建时间倒序排列（最新的在前）
  result.sort((a, b) => b.createdAt - a.createdAt);

  // 计算分页起始索引
  const start = (page - 1) * limit;

  // 返回当前页的数据
  return result.slice(start, start + Number(limit));
}

// 更新任务
function updateTask(userId, id, updates) {
  // 查找属于当前用户且 ID 匹配的任务
  const task = tasks.find(t => t.id === Number(id) && t.userId === userId);

  // 找不到则抛出错误
  if (!task) throw new Error('任务不存在');

  // 如果传入了 title，更新标题
  if (updates.title !== undefined) task.title = updates.title;

  // 如果传入了 done，更新完成状态
  if (updates.done !== undefined) task.done = updates.done;

  // 返回更新后的任务
  return task;
}

// 删除任务
function deleteTask(userId, id) {
  // 查找任务索引
  const index = tasks.findIndex(t => t.id === Number(id) && t.userId === userId);

  // 找不到则抛出错误
  if (index === -1) throw new Error('任务不存在');

  // 从数组中删除并返回被删除的任务
  return tasks.splice(index, 1)[0];
}

// 显示任务详情
function getTask(id) {
  // 根据 ID 查找任务
  const result = tasks.filter(t => t.id === Number(id));

  // 返回任务对象，找不到返回 null
  return result.length > 0 ? result[0] : null;
}

// 查看指定用户的任务列表
function userTasks(userId) {
  // 将传入的 userId 转为数字，确保与任务中的 userId 类型一致
  const uid = Number(userId);

  // 返回该用户的所有任务数组（没有任务时返回空数组）
  return tasks.filter(t => t.userId === uid);
}

// 导出所有任务操作函数
module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
  getTask,
  userTasks,
};