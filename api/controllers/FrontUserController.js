module.exports = {

  hobby: async(req, res) => {
    try {
      let isHasMail = req.query.hasMail;
      if (!isHasMail)
        res.redirect('/')

      let categorys = await PostService.getAllCategory();
      res.view('pages/registerHobby', {
        isHasMail,
        categorys
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  favorites: async(req, res) => {
    try {
      console.log("==== getFavoriteViews ===");
      let allPosts = await PostService.getAllPost();
      let loginState = await UserService.getLoginState(req);
      let loginedUser = await UserService.getLoginUser(req);
      let userFavorites = await FavoriteService.get({
        userId: loginedUser.id
      });

      let deleteItem = []
      allPosts.data.forEach(function(post, i){
        userFavorites.forEach(function(favorite, j){
          if(post.id == favorite.id){
            deleteItem.push(i);
          }
        })
      })

      for(let i = deleteItem.length-1; i >= 0; i--){
        allPosts.data.splice(deleteItem[i], 1);
      }

      res.view('pages/favorite', {
        favorites: userFavorites,
        loginState: loginState,
        loginedUser: loginedUser,
        allPosts: allPosts.data
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  profile: async(req, res) => {
      try {
        console.log("==== getProfileView ===");
        let loginedUser = await UserService.getLoginUser(req);
        let fbId = await UserService.getFBId(loginedUser.id);

        let favorites = await FavoriteService.get({
          userId: loginedUser.id
        });

        let profilePost = await Post.findAll({
          where: {
            UserId: loginedUser.id
          }
        });

        let postLastChat = [];
        for(let post of profilePost ){
          let lastChat = await ChatService.lastOnehistory(post.dataValues.id, loginedUser.id);
          post = {
            ...post.dataValues
          }
          post.lastChat =  lastChat ? lastChat.dataValues.content : null
          postLastChat.push({
            ...post
          })
        }
        console.log(postLastChat);
        let profile = {
          name: loginedUser.username,
          allUserPost: postLastChat,
          postCount: profilePost.length,
          favCount: favorites.length,
          activity: Math.round(profilePost.length * 1.5 + favorites.length),
          fbId,
        }


        res.view('pages/profile', {
          profile,
        });
      } catch (e) {
        sails.log.error(e);
        res.serverError(e);
      }
    } // end getProfileView
}
