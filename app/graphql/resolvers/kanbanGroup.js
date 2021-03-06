const { findOne, getList, create, remove, update } = require('../../service/common');

module.exports = {
  Query: {
    kanbanGroups: async (parents, args, context, info) => {
      return await getList({ model: 'KanbanGroup', ...args, ctx: context.ctx });
    },
  },

  Mutation: {
    createKanbanGroups: async (parents, args, context, info) => {
      return await create({ model: 'KanbanGroup', ...args, ctx: context.ctx });
    },
    removeKanbanGroups: async (parents, args, context, info) => {
      return await remove({
        ...args,
        model: 'KanbanGroup',
        ctx: context.ctx,
      });
    },
    updateKanbanGroups: async (parents, args, context, info) => {
      return await update({ model: 'KanbanGroup', ...args, ctx: context.ctx });
    },
  },
};
