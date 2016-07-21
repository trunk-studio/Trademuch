describe.only('about Auth Controller operation.', function() {
  it('register user should success.', async (done) => {

    try {

      let newUser = {
        username: 'newUser',
        email: 'newUser@gmail.com',
        password: 'newUser'
      }

      let result = await request(sails.hooks.http.app)
      .post('/rest/auth/local/register')
      .send(newUser);

      let {email} = newUser;
      let checkUser = await User.findOne({
        where: {email},
        include: Passport
      });

      checkUser.email.should.be.equal(newUser.email);
      checkUser.Passports[0].password.should.be.equal(newUser.password);
      result.status.should.be.equal(302);
      result.headers.location.should.be.equal('/user/hobby?hasMail=true');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('login user use eamil should success.', async (done) => {

    try {
      let loginInfo = {
        identifier: 'newUser@gmail.com',
        password: 'newUser'
      }

      let result = await request(sails.hooks.http.app)
      .post('/rest/auth/local')
      .send(loginInfo);

      result.status.should.be.equal(302);
      result.headers.location.should.be.equal('/user/hobby?hasMail=true');

      done();
    } catch (e) {
      done(e);
    }
  });

  it('get user token', async (done) => {

    try {
      let loginInfo = {
        email: 'newUser@gmail.com',
        password: 'newUser'
      }
      //
      let result = await request(sails.hooks.http.app)
      .post('/rest/auth/token')
      .send({body: JSON.stringify(loginInfo)});

      result.status.should.be.equal(200);
      console.log('result.body', result.body);

      done();
    } catch (e) {
      done(e);
    }
  });

  it('user data login', async (done) => {

    try {
      let email = 'newUser@gmail.com';
      let user = await User.findOne({where: {email}})
      //
      let result = await request(sails.hooks.http.app)
      .post(`/chat/1/public`)
      .send({user});


      done();
    } catch (e) {
      done(e);
    }
  });


});
