module.exports = {

  story: async(req, res) => {
    try {
      res.view('story');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  show: async(req, res) => {
    try {
      console.log("==== getPostById ===", req.param('id'));
      let post = await PostService.getPostById(req.param('id'));
      let fbId=0;

      let login = await UserService.getLoginState(req);
      let isFav = false;
      if(login){
        let user = await UserService.getLoginUser(req);
        let UserFavorites = await FavoriteService.get({userId: user.id});
        console.log("===UserFavorites[0]=>",UserFavorites[0]);
        let itemId = req.param('id');
        fbId = await UserService.getFBId(user.id);
        console.log("fbId=>",fbId);
        UserFavorites.forEach(function(fav) {
          if(fav.id==itemId) isFav = true;
        }); // end forEach
      }
      res.view('pages/postDetail', {
        post,
        isFav,
        fbId
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  createCategory: async(req, res) => {
    try {

      let categorys = await PostService.getAllCategory();
      res.view('pages/createCategory', {
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  createByCategoryId: async(req, res) => {
    try {
      res.view('pages/createDetail');
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }

}
