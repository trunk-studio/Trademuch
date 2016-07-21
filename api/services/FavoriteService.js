module.exports = {

  create: async({userId,postId}) => {
    try {
      sails.log.info("| FavoriteService:[userId]%s,[postId]%s", userId,postId);
      let user = await User.findById(userId);
      let checkRepeat = await user.hasPosts(postId);
      console.log("!!!!!checkRepeat",checkRepeat);
      let favorites = {};
      if(!checkRepeat) favorites =  await user.addPost(postId);
      return favorites;
    } catch (e) {
      throw e;
    }
  },

  delete: async({userId,postId}) => {
    try {
      sails.log.info(userId,postId);
      let user = await User.findById(userId);
      let checkHave = await user.hasPosts(postId);
      let favorites;
      if(checkHave)
        favorites =  await user.removePost(postId);
      return favorites;
    } catch (e) {
      throw e;
    }
  },

  get: async({userId}) => {
    try {
      sails.log.info("getUserFavorites:userId=>",userId);
      let user = await User.findById(userId);
      let favorites = await user.getPosts({
        order: 'createdAt DESC'
      });
      console.log("favorites.length=>",favorites.length);
      if(favorites.length>0){
        favorites.forEach(function(fav){
          if(fav.coverImage==null){
            fav.coverImage = '/img/items/1.jpg';
          }
        });
        // console.log("favorites=>",favorites)
        console.log("favorites[0]=>",favorites[0]);
        // console.log("favorites[0].UserFavorite=>",favorites[0].UserFavorite)
        // console.log("favorites[0].User=>",favorites[0].User)
        // console.log("favorites[0].Item=>",favorites[0].Item)
      }
      return favorites;
    } catch (e) {
      throw e;
    }
  },
}
