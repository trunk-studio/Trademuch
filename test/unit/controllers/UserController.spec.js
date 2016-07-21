import sinon from 'sinon';
describe('about User Controller operation.', function() { //skip

  it.skip('should success.', async (done) => {
    try {
      let res = await request(sails.hooks.http.app).get(`/user/find`);
      let {users} = res.body;
      users.should.be.Array;
      done();
    } catch (e) {
      done(e);
    }
  });

  describe('update user mail & location', () => {

    let testUser,place;
    before(async (done) => {
      try {
        testUser = await User.create({
          "username": "testuser",
        });

        sinon.stub(UserService, 'getLoginState', (req) => {
          return true;
        });
        sinon.stub(UserService, 'getLoginUser', (req) => {
          return testUser;
        });

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

    it('update user Email should success.', async (done) => {
      try {

        let result = await request(sails.hooks.http.app)
        .put('/rest/user/')
        .send({
          email: '123123123@gmail.com',
          location:{
            latitude:10,
            longitude:-10
          }
        });
        console.log(result.body);
        result.status.should.be.equal(200);
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });
});
