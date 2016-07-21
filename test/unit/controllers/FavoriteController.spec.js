import sinon from 'sinon';
describe('about Favorite Controller operation.', function() { //skip
  describe('FavoriteController Favorite', () => {

    let testUser,testUser2, post , createPost, createPost2;
    before(async (done) => {
      try {
        testUser = await User.create({
          "username": "testuser",
        });

        testUser2 = await User.create({
          "username": "testuser2",
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });

        sinon.stub(UserService, 'getLoginUser', (req) => {
          return testUser;
        });

        let place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })

        createPost = await Post.create({
          "uuid": '12311231231',
          "title": "AAAA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });

        await createPost.addPlace(place.id)

        createPost2 = await Post.create({
          "uuid": '4564564uioi',
          "title": "AAAA",
          "startDate": "2015-12-01",
          "user_id": testUser2.id
        });
        await testUser.addPost(createPost2.id)
        await createPost2.addPlace(place.id)
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    after( (done) => {
      UserService.getLoginState.restore();
      UserService.getLoginUser.restore();
      done();
    });

    it('add favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost.id
        }

        let before = await testUser.getPosts();
        let result = await request(sails.hooks.http.app)
        .post('/rest/favorite/' + createPost.id);
        result.status.should.be.equal(200);
        let after = await testUser.getPosts();
        result.should.be.an.Array;
        after.length.should.be.above(before.length)
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('del favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost2.id
        }
        console.log(send);
        let before = await testUser.getPosts();
        let result = await request(sails.hooks.http.app)
        .delete('/rest/favorite/' + createPost2.id);
        result.status.should.be.equal(200);
        let after = await testUser.getPosts();
        result.should.be.an.Array;
        after.length.should.be.below(before.length)
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

    it('get favorites should success.', async (done) => {
      try {

        let result = await request(sails.hooks.http.app)
        .get('/rest/favorites');
        sails.log.info("!!!",result.body);
        result.status.should.be.equal(200);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
