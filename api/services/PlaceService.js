module.exports = {

  add: async({userId,placeInfo}) => {
    try {
      sails.log.info("updateUserLocation(userId,place)=>",userId,placeInfo);
      let user = await User.findById(userId);
      let place = await Place.create(placeInfo)
      place = await user.addPlace(place.id);
      return place;
    } catch (e) {
      throw e;
    }
  }
}
