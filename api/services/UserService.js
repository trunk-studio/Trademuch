module.exports = {
  findAll: async () => {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  },
  getLoginState: function(req) {
    if (req.session.authenticated) {
      return true;
    } else {
      return false;
    }
  },

  getLoginUser: function(req) {
    if (req.session.passport != undefined && req.session.passport.user) {
      return req.session.passport.user;
    } else {
      return null;
    }
  },

  userToSession: function(user, req) {
    req.session.authenticated = true;
    req.session.passport = {
      user: user
    }

    let loginStatus = UserService.getLoginState(req);
    let sessionUser = UserService.getLoginUser(req);

    console.info('loginStatus ', loginStatus, 'sessionUser', sessionUser);


  },


  getFBId: async(userId) => {
    try {
      let UserFaceBook = await Passport.findOne({
        where:{
          UserId: userId,
          provider: 'facebook'
        },
        attributes: { exclude: ['createdAt','updatedAt', 'protocol', 'password', 'accessToken', 'tokens'] }
      });
      return UserFaceBook.identifier;
    } catch (e) {
      throw e
    }
  },

  updateUserMail: async({userId,userMail,userLocation}) => {
    try {
      sails.log.info("updateUserMail(userId,userMail)=>",userId,userMail);
      let user = await User.findById(userId);
      user.email = userMail;
      user = await user.save();
      return user;
    } catch (e) {
      throw e;
    }
  },
}
