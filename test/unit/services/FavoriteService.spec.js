describe('about Favorite Service operation.', function() {

  describe('User Favorite', () => {

    let testUser,testUser2, post , createPost, createPost2;
    before(async (done) => {
      try {
        testUser = await User.create({
    			"username": "testuser",
        });

        testUser2 = await User.create({
    			"username": "testuser2",
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

    it('add favorite should success.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          postId: createPost.id
        }

        let before = await testUser.getPosts();
        let result = await FavoriteService.create(send);
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
        let result = await FavoriteService.delete(send);
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

        let send = {
          userId: testUser.id,
        }

        let result = await FavoriteService.get(send);
        result.should.be.an.Array;
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

});
