module.exports = {
  findAll: async() => {
    try {
      return await Item.findAll();
    } catch (e) {
      throw e;
    }
  },


  create: async({
    LikeId, itemname, pic
  }) => {
    try {
      // let pic = '';
      // if (pic == undefined || pic == null) {
      //   pic = await FlickrService.searchGetty(itemname);
      // }
      let createItem = await Item.create({
        itemname: itemname,
        LikeId: LikeId
        // pic: pic
      });
      return createItem;
    } catch (e) {
      throw e;
    }
  },

  findByLikeId: async(id) => {
    try {
      return [];
    } catch (e) {
      throw e;
    }
  }


}
