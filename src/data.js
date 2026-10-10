// 内存数据存储，进程重启后清空
const users = [];
const tasks = [];
const tokens = new Map(); // token -> userId

let nextUserId = 1;
let nextTaskId = 1;

module.exports = {
  users,
  tasks,
  tokens,
  nextUserId: () => nextUserId++,
  nextTaskId: () => nextTaskId++,
};
