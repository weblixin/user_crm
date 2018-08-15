const router = require('koa-router')()
const UserModel = require('../model/User.js')
const crypto=require('crypto');

router.prefix('/users')

router.post('/', async (ctx, next) => {
	if(ctx.session.username != '' && ctx.session.password != '') {
		if(ctx.session.powerCode == 0) {
			let md5 = crypto.createHash('md5');
			let password=md5.update(ctx.request.body.password).digest('base64');
			let messages = {
				username: ctx.request.body.username,
				password: password,
				power: ctx.request.body.powerCode == 1 ? '普通用户' : '超级管理员',
				powerCode: ctx.request.body.powerCode
			}
			let user = await UserModel.findOne({username: ctx.request.body.username})
			if(user) {
				ctx.body = {
					status: '1000',
					msg: '添加失败，用户名已存在'
				}
			} else {
				let docs = await UserModel.create(messages)
				ctx.body = {
					status: '0',
					msg: '添加成功'
				}
			}
		} else {
			ctx.body = {
				status: '1002',
				msg: '不好意思，您没有权限访问该页面'
			}
		}
	} else {
		ctx.body = {
			status: '1002',
			msg: '您还没有登录，请登录后再试'
		}
	}
	
})

router.get('/', async (ctx, next) => {
	if(ctx.session.username != '' && ctx.session.password != '') {
		let md5 = crypto.createHash('md5');
		let oldPwd = await md5.update(ctx.request.query.password).digest('base64');
		if(ctx.session.password == oldPwd) {
			let md55 = crypto.createHash('md5');
			let newPwd = await md55.update(ctx.request.query.newPassword).digest('base64');
			let id = ctx.request.query._id
			let docs = await UserModel.findByIdAndUpdate(id, {password: newPwd})
			if(!docs) {
				ctx.body = {
					status: '1000',
					msg: '参数错误，请重新输入'
				}
			} else {
				ctx.body = {
					status: '0',
					msg: '密码修改成功',
					data: {
						data: docs
					}
				}
			}
		} else {
			ctx.body = {
				status: '1000',
				msg: '用户名和密码不匹配，请重新输入'
			}
		}
	} else {
		ctx.body = {
			status: '1002',
			msg: '您还没有登录，请登录后再试'
		}
	}
})

module.exports = router