const statsBill = require('../../service/diary/statsBill');
const { getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    diaries: async (parents, args, context, info) => {
      return await getList({ model: 'Diary', ...args, ctx: context.ctx });
    },
    statsBill: async (parents, args, context, info) => {
      return await statsBill({ ... args, ctx: context.ctx });
    },
  },
  Mutation: {
    createDiaries: async (parents, args, context, info) => {
      return await create({ model: 'Diary', ...args, ctx: context.ctx });
    },
    removeDiaries: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'Diary',
        unique: 'name',
        ctx: context.ctx,
      });
    },
    updateDiaries: async (parents, args, context, info) => {
      return await update({ model: 'Diary', ...args, ctx: context.ctx });
    },
  },
}
