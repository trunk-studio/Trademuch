describe('about Chat Service .', function() {

  describe('get last chat', () => {

    let room, user, chatUser, chat, post, chats;
    before(async (done) => {
      try {

        user = await User.create({
    			"username": "testuser2",
    			"email": "xcvljlk123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });

        chatUser = await User.create({
    			"username": "testuser2",
    			"email": "xcvljlkasasd123@gmail.com",
    			"age": 0,
    			"is_first_login": 1,
        });


        post = await Post.create({
    			"uuid": "sdfglsdfglkj",
    			"title": "searchPost",
    			"startDate": "2015-12-01 08:00:00",
    			"created_at": "2016-03-10 17:07:59",
    			"updated_at": "2016-03-10 17:07:59",
    			"user_id": user.id
        })

        room = await Room.create({
          "uuid": post.uuid,
          "type": "public",
          "limit": 0
        });

        chats = [{
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:07:59",
          "room_id": room.id,
          "user_id": user.id
        },{
          "uuid": '123e534512312312',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:08:59",
          "room_id": room.id,
          "user_id": chatUser.id
        },
        {
          "uuid": '123e5345123',
          "type": "public",
          "content": "1231213",
          "created_at": "2016-03-10 17:10:59",
          "room_id": room.id,
          "user_id": user.id
        }]
        chat = await Chat.bulkCreate(chats);

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('should success.', async (done) => {
      try {

        let result = await ChatService.lastOnehistory(post.uuid, user.id);
        console.log(result);
        result.content.should.be.equal(chats[1].content);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
