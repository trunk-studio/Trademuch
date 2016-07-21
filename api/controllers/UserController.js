module.exports = {
  
  find: async(req, res) => {
    try {
      let users = await UserService.findAll();
      res.ok({
        users
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  update: async(req, res) => {
    console.log("====updateHobbyAndMail===", req.body);
    try {
      let data = req.body;
      let user = UserService.getLoginUser(req);

      if (data.email) {
        await UserService.updateUserMail({
          userId: user.id,
          userMail: data.email
        });
      }
      await PlaceService.add({
        userId: user.id,
        placeInfo: data.location
      });

      res.ok('ok');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }
}
