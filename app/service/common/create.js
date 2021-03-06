const _ = require('lodash');
const getList = require('./getList');
const logger = require('../../../utils/logger');

/**
 * 通用创建数据方法
 * @param {String}  model         模型名称
 * @param {Object}  ctx           koa上下文
 * @param {Array}   body          创建信息
 * @param {Object}  search        查询参数
 * @param {Object}  pagination    分页参数
 * @param {Object}  orderBy       排序
 */
module.exports = async ({ model, ctx, body, search, orderBy, pagination }) => {
  const data = {
    list: [],
    change: [],
    pagination: {},
    message: '创建成功',
  };
  const server = ctx.db.mongo[model];
  try {
    data.change = await server.insertMany(body.map(v => ({
      ...v,
      creator: _.get(ctx, 'state.user.id', null),
      updater: _.get(ctx, 'state.user.id', null),
    })));
  } catch(e) {
    logger.error('创建失败: ', e);
    data.message = '创建失败';
  }
  if (search){
    const listData = await getList({ model, ctx, search, orderBy, pagination });
    data.pagination = listData.pagination || {};
    data.list = listData.list || [];
  }
  return data;
}
