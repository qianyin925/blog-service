const {getList, create, remove, update } = require('../../service/common');
const removeBypayload = require('../../service/photo/removeBypayload');
const { creator, updater } = require('./fragment');

module.exports = {
  Query: {
    articles: async (parents, args, context, info) => {
      return await getList({ model: 'Article', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createArticles: async (parents, args, context, info) => {
      return await create({ model: 'Article', ...args, ctx: context.ctx });
    },
    removeArticles: async (parents, args, context, info) => {
      const data = await remove({ model: 'Article', ...args, ctx: context.ctx });
      removeBypayload({
        ctx: context.ctx,
        payload: data.change.map(v => v.id),
      });
      return data;
    },
    updateArticles: async (parents, args, context, info) => {
      return await update({ model: 'Article', ...args, ctx: context.ctx });
    },
  },

  Article: {
    creator,
    updater,
    tags: async (parents, args, context, info) => {
      if (parents.tags){
        const data = await getList({
          model: 'Tag',
          ctx: context.ctx,
          search: {ids: parents.tags}
        });
        return data.list;
      } else {
        return [];
      }
    },
  }
}
