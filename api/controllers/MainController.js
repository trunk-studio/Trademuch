module.exports = {

  pcOrMobile: async(req, res) => {
    try {
      if (/mobile/i.test(req.headers['user-agent'])) {
        return res.redirect('/app');
      } else {
        res.view('landing')
      }
    } catch (e) {
      console.log(e);
      res.serverError(e);
    }
  },

  index: async(req, res) => {
    try {
      let items = await PostService.getAllPost();
      // check login state
      let loginState = await UserService.getLoginState(req);
      let loginedUser = {},
        favorites = {},
        favIds = [],
        fbId = 0;

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        fbId = await UserService.getFBId(loginedUser.id);
        favorites = await FavoriteService.get({
          userId: loginedUser.id,
        });
        sails.log.info("| MainController.index=>[loginedUser]", loginedUser);

        for (let i = 0; i < favorites.length; i++) {
          favIds.push(favorites[i].id);
        }
        sails.log.info("| MainController.index:[favIds]", favIds);

        for (let i = 0; i < favIds.length; i++) {
          for (let j = 0; j < items.data.length; j++) {
            if (items.data[j].id == favIds[i]) {
              items.data[j].isFav = true;
              sails.log.info("| MainController.index=>items.data index(%d), id(%d)", j, items.data[j].id);
            }
          }
          // console.log("!!!!!!!!!!!!!!!!!,",items.data[favIds[i] - 1].id ,favIds[i].id);
          // items.data[favIds[i]].isFav = true;
          // sails.log.info("| MainController.index:[favId]%s,[itemsId]%s", favIds[i], items.data[favIds[i] - 1].id);
        }
        // sails.log.info("| MainController.index:[items]", items);
      } // end if
      sails.log.info("| MainController.index:[loginState]", loginState);

      // output!
      res.view('app', {
        loginState,
        items: items.data,
      });
    } catch (e) {
      res.serverError(e);
    }
  },

  indexBySearchKeyword: async(req, res) => {
    try {
      // find items
      let keyword = req.param('keyword');
      let items = await PostService.getPostByKeyword(keyword);

      sails.log.info("| MainController.indexBySearchKeyword:[keyword]", keyword);
      sails.log.info("| MainController.indexBySearchKeyword:[items]", items);

      // check login state
      let loginState = await UserService.getLoginState(req);
      let loginedUser = {},
        favorites = {},
        favIds = [],
        fbId = 0;

      if (loginState) {
        loginedUser = await UserService.getLoginUser(req);
        fbId = await UserService.getFBId(loginedUser.id);
        favorites = await FavoriteService.get({
          userId: loginedUser.id,
        });
        sails.log.info("| MainController.indexBySearchKeyword:[loginedUser]", loginedUser);

        for (let i = 0; i < favorites.length; i++) {
          favIds.push(favorites[i].id);
        }
        sails.log.info("| MainController.indexBySearchKeyword:[favIds]", favIds);

        for (let i = 0; i < favIds.length; i++) {
          // for (let j = 0; j < items.length; j++) {
          //   if(items.data[j].id==favIds[i].id) items.data[j].isFav = true;
          // }
          if (items.data[favIds[i] - 1].id == favIds[i].id) items.data[favIds[i] - 1].isFav = true;
          sails.log.info("| MainController.indexBySearchKeyword:[favId]%s,[itemsId]%s", favIds[i], items.data[favIds[i] - 1].id);
        }
        // sails.log.info("| MainController.index:[items]", items);
      } // end if
      sails.log.info("| MainController.indexBySearchKeyword:[loginState]", loginState);

      // output!
      res.view('app', {
        loginState,
        items,
        keyword,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },


}
