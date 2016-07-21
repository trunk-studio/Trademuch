import sinon from 'sinon';

describe('about Post Controller operation.', function() {


  describe('about Post Controller operation.', function() {

    let like, item;
    before(async(done) => {
      try {
        let user = await User.create({
          "username": "testPost",
          "email": "testPostController@gmail.com",
          "age": 18
        });
        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });
        sinon.stub(UserService, 'getLoginUser', (req) => {
          return user;
        });

        let testUser2 = await User.create({
          "username": "testuser2",
        });

        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })

        let createPost = await Post.create({
          "uuid": '12311231231',
          "title": "AAAA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });

        await createPost.addPlace(place.id)

        done();
      } catch (e) {
        done(e)
      }
    });

    after((done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('add new Post have radioItem should success.', async(done) => {
      try {

        let send = {
          "mode": "give",
          "hobby": 1,
          "detail": {
            "title": "123",
            "startDate": "2015-12-25",
            "endDate": "2015-12-31",
            "price": "200",
            "radioItem": 1,
            "item": ""
          },
          "location": {
            "latitude": 24.148657699999998,
            "longitude": 120.67413979999999,
            "accuracy": 30
          }
        }

        let result = await request(sails.hooks.http.app)
          .post('/rest/post/create')
          .send(send);

        result.status.should.be.equal(200);

        done();
      } catch (e) {
        done(e);
      }
    });



    it('get all post should success.', async(done) => {
      try {
        let result = await request(sails.hooks.http.app)
          .get('/rest/post');
        sails.log.info(result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
        done(e);
      }
    });

  });


  describe('delete post', (done) => {
    let user1, user2;
    before(async(done) => {
      try {
        user1 = await User.create({
          "username": "testDelPost",
          "email": "testDelCOPost1@gmail.com",
          "age": 18
        });

        user2 = await User.create({
          "username": "testDelPost",
          "email": "testDelCOPost2@gmail.com",
          "age": 18
        });

        done();
      } catch (e) {
        console.log(e);
        done(e)
      }
    });

    describe('delete owen post', (done) => {
      let post;
      before(async(done) => {
        try {

          sinon.stub(UserService, 'getLoginState', (req) => {
            return true;
          });

          sinon.stub(UserService, 'getLoginUser', (req) => {
            return user1;
          });

          post = await Post.create({
            uuid: 'sdfsdfs123',
            title: 'test',
            startDate: '2014-12-1',
            endDate: '2014-12-10',
            user_id: user1.id,
            coverImage: ''
          });
          done()
        } catch (e) {
          done(e)
        }
      });

      after(async(done) => {
        UserService.getLoginState.restore();
        UserService.getLoginUser.restore();
        done();
      });


      it('user delete owen post', async(done) => {
        try {
          let result = await request(sails.hooks.http.app)
            .delete(`/rest/post/${post.id}`);
          result.status.should.be.equal(200);
          result.body.success.should.be.equal('ok');
          console.log(result.body);
          done()
        } catch (e) {
          console.log(e);
          done(e)
        }
      })
    });

    describe('delete not user post', (done) => {
      let post;
      before(async(done) => {
        try {

          sinon.stub(UserService, 'getLoginState', (req) => {
            return true;
          });

          sinon.stub(UserService, 'getLoginUser', (req) => {
            return user2;
          });

          post = await Post.create({
            uuid: '123123123',
            title: 'test',
            startDate: '2014-12-1',
            endDate: '2014-12-10',
            user_id: user1.id,
            coverImage: ''
          });
          done()
        } catch (e) {
          done(e)
        }
      });

      after(async(done) => {
        UserService.getLoginState.restore();
        UserService.getLoginUser.restore();
        done();
      });


      it('user delete owen post', async(done) => {
        try {
          let result = await request(sails.hooks.http.app)
            .delete(`/rest/post/${post.id}`);
          result.status.should.be.equal(500);
          result.body.success.should.be.equal('fail');
          done()
        } catch (e) {
          console.log(e);
          done(e)
        }
      });

    });
  });
});