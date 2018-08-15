var app = require('../app')
var request = require('co-supertest').agent(app.listen(process.env.PORT || 3333));
var should = require('chai').should();


describe('接口测试', function() {
	it('登录接口', function *(){
    	var res = yield request
	        .post('/login')
	        .send({username: 'admin',password: 'admin'})
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200)
	        .end();
        var body = JSON.parse(res.text);
	    body.should.have.deep.property('status');
	    body.should.have.deep.property('msg');
	    body.should.have.deep.property('data');
	});
	it('添加用户接口', function *(){
    	var res = yield request
	        .post('/users')
	        .send({username: 'mingxingshuo', password: 'mingxingshuo', powerCode: 1})
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200)
	        .end();
        var body = JSON.parse(res.text);
	    body.should.have.deep.property('status');
	    body.should.have.deep.property('msg');
	});
	it('修改密码接口', function *(){
    	var res = yield request
	        .get('/users?_id=5b71614e8e59a33f0848b344&password=admin&newPassword=123456')
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200)
	        .end();
        var body = JSON.parse(res.text);
	    body.should.have.deep.property('status');
	    body.should.have.deep.property('msg');
	    body.should.have.deep.property('data');
	});
	it('发布文章接口', function *(){
    	var res = yield request
	        .post('/articles')
	        .send({user_id: '5b71614e8e59a33f0848b344', title: '第六感', author: '美国巴林顿大学', content: '公司前台来了一个妹子，说下午下班让我去帮她搬家，因为她刚来，不熟，于是我就问：咱俩又不熟，你怎么知道我一定会帮你？她说：你一定会帮我的，因为我有第六感啊！我：……等等……你有啥？'})
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200)
	        .end();
        var body = JSON.parse(res.text);
	    body.should.have.deep.property('status');
	    body.should.have.deep.property('msg');
	    body.should.have.deep.property('data');
	});
    it('退出接口', function *(){
    	var res = yield request
	        .get('/logout')
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200)
	        .end();
        var body = JSON.parse(res.text);
	    body.should.have.deep.property('status');
	    body.should.have.deep.property('msg');
	});
});

