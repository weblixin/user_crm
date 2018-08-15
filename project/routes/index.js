const router = require('koa-router')()
const UserModel = require('../model/User.js')
const crypto=require('crypto');

router.post('/login', async (ctx, next) => {
	const md5=crypto.createHash('md5');
	let username = ctx.request.body.username, 
			password = md5.update(ctx.request.body.password).digest('base64'), 
			message = await UserModel.find({username: username, password: password})
	if (message == '') {
		ctx.body = {
			status: '1000',
			msg: '用户名或密码填写错误，请重新输入'
		}
	} else {
		ctx.session.username = username;
		ctx.session.password = password;
		ctx.session.powerCode = message.powerCode;
		ctx.body = {
			status: '0',
			msg: '登陆成功',
			data: {
				username:　username
			}
		}
	}
})

router.get('/logout', async (ctx, next) => {
	ctx.session.username = '';
	ctx.session.password = '';
	ctx.session.powerCode = '';
	console.log(ctx.session)
	ctx.body = {
		status: '0',
		msg: '已退出当前账号'
	}
})

module.exports = router
