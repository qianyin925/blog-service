const mongoose = require('mongoose');
const { STATUS, SEX } = require('../config/consts');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '数据字典';
exports.type = 'MongoDB';

exports.fields = {
  code: {
    type: Number,
		required: true,
    title: '数据字典类型_标识',
  },
  value: {
    type: Number,
    title: '存储值',
		required: true,
  },
  name: {
    type: String,
    title: '显示名',
		required: true,
  },
  icon: {
    type: String,
    title: '图标',
  },
  desc: {
    type: String,
    title: '描述',
  },
  parent: {
		title: '父级',
		type: ObjectId
  },

	status: {
		title: '状态',
		default: STATUS.ENABLE,
		type: Number,
	},
	creator: {
		title: '创建人',
		type: ObjectId
	},
	creationTime: {
		title: '创建时间',
		type: Date,
		default: Date.now,
	},
	updater: {
		title: '最近更新人',
		type: ObjectId,
	},
	updateTime: {
		title: '最近更新时间',
		type: Date,
		default: Date.now,
	},
};
