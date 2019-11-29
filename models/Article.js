const mongoose = require('mongoose');
const { STATUS } = require('../config/conts');
const ObjectId = mongoose.Schema.Types.ObjectId;

exports.title = '文章';
exports.type = 'MongoDB';

exports.fields = {
  name: {
    unique: true,
		title: '标题',
    required: true,
		type: String,
  },
  desc: {
    title: '描述（概要）',
		type: String,
  },
  thumb: {
    title: "缩略图",
    type: String
  },
  tags: {
    title: '标签ID',
		type: [ObjectId],
  },
  content: {
    title: '内容',
		type: String,
  },
  views: {
    default: [],
    title: '阅读量',
    type: [String],
  },
	status: {
		title: '状态',
		default: STATUS.ENABLE,
		type: Number,
	},
  creator: {
		title: '创建人',
		type: String,
	},
	creationTime: {
		title: '创建时间',
		type: Date,
		default: Date.now,
	},
	updater: {
		title: '最近更新人',
		type: String,
	},
	updateTime: {
		title: '最近更新时间',
		type: Date,
		default: Date.now,
	},
}
