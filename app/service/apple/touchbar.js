const _ = require('lodash');
const moment = require('moment');

// 获取最新体重
const getLatestWeight = async ({ ctx }) => {
  const server = ctx.db.mongo.Diary;
  const [data] = await server.find()
    .skip(0)
    .limit(1)
    .sort({ name: -1 });
  return Number.parseInt(_.get(data, 'bodyIndex.weight', 0) * 10, 10) / 10;
};

// 获取月账单
const getMonthlyBill = async ({ ctx }) => {
  const startTime = moment().startOf('month').format('YYYY-MM-DD');
  const endTime = moment().endOf('month').format('YYYY-MM-DD');
  const server = ctx.db.mongo.Diary;

  const data = await server.find({
    creationTime: {
      $gte: startTime,
      $lte: endTime,
    },
  });

  const bills = data.reduce((total, ele) => ([
    ... total,
    ... (ele.bill || []),
  ]), []);

  return bills.reduce((total, ele) => ({
    income: Number.parseInt((total.income + (ele.income || 0)) * 10, 10) / 10,
    expend: Number.parseInt((total.expend + (ele.expend || 0)) * 10, 10) / 10,
  }), { income: 0, expend: 0 });
}

// 用于 mac touchbar 上信息提示
module.exports = async args => {
  return {
    latestWeight: await getLatestWeight(args),
    monthlyBill: await getMonthlyBill(args),
  };
};
