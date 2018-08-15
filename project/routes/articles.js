const router = require('koa-router')()
const ArticleModel = require('../model/Article.js')

router.prefix('/articles')

router.post('/', async (ctx, next) => {
	if(ctx.session.username != '' && ctx.session.password != '') {
		let articleInfo = {
			user_id: ctx.request.body.user_id,
			title: ctx.request.body.title,
			author: ctx.request.body.author,
			content: ctx.request.body.content,
		} 
		let article = await ArticleModel.create(articleInfo)
		ctx.body = {
			status: '0',
			msg: '文章发布成功',
			data: {
				title: article.title,
				author: article.author,
				content: article.content
			}
		}
	} else {
		ctx.body = {
			status: '1000',
			msg: '您还没有登录，请登录后重试'
		}
	}
})

module.exports = router
