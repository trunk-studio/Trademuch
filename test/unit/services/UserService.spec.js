describe('about User Service operation.', function() {

  describe('update user mail & like', () => {

    let testUser,place;
    before(async (done) => {
      try {
        testUser = await User.create({
          "username": "testuser",
        });
        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('update user Email should success.', async (done) => {
      try {

        let mail = "123@gmail.com"
        let send = {
          userId: testUser.id,
          userMail: mail
        }
        let result = await UserService.updateUserMail(send);
        result.email.should.be.equal(mail);
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });


  describe('test facebook login User', () => {
    let testUser;
    let facebookId = "123345567";
    before(async (done) => {
      try {
        testUser = await User.create({
          "username": "testuser",
        });
        let passport = await Passport.create({
          "protocol": "oauth2",
          "provider": "facebook",
          "identifier": facebookId,
          "UserId": testUser.id
        })
        done()
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('get facebook id', async (done) => {
      try {
        let result = await UserService.getFBId(testUser.id)
        result.should.be.an.equal(facebookId);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });


});
