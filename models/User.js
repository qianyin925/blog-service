const mongoose = require('mongoose');
const { STATUS, SEX } = require('../config/consts');
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Mixed = mongoose.Schema.Types.Mixed;

exports.title = '用户';
exports.type = 'MongoDB';

exports.fields = {
	name: {
    unique: true,
		title: '用户名',
		required: true,
		type: String,
	},
	account: {
    unique: true,
		title: '账号',
		required: true,
		type: String,
	},
	password: {
		title: '密码',
		required: true,
		type: String,
  },
  avatar: {
    title: '头像',
		type: String,
  },
  motto: {
    title: '座右铭(个签)',
		type: String,
  },
	role: {
		title: '角色',
		require: true,
		type: ObjectId,
	},
	sex: {
		title: '性别',
		type: Number,
		default: SEX.BOY,
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
