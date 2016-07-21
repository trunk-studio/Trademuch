module.exports = {

  create: async(req, res) => {
    try {
      sails.log.info("=== addUserFavorite ===", req.param('id'));
      let user = await UserService.getLoginUser(req);
      let data = {
        userId: user.id,
        postId: req.param('id')
      };
      let item = await FavoriteService.create(data);
      res.ok({
        result: true,
        item,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  delete: async(req, res) => {
    try {
      sails.log.info("=== delUserFavorite ===", req.param('id'));
      let user = await UserService.getLoginUser(req);
      let data = {
        userId: user.id,
        postId: req.param('id')
      };
      let item = await FavoriteService.delete(data);
      let result = {
        result: true,
        item,
      }
      res.ok(result);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  get: async(req, res) => {
    try {
      console.log("==== getUserFavorites ===");
      let user = await UserService.getLoginUser(req);
      let userFavorites = await FavoriteService.get({
        userId: user.id
      });
      res.ok(userFavorites);
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },
}
