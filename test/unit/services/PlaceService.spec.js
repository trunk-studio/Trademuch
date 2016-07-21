describe('about Place Service .', function() {

  describe('user add one place', () => {

    let testUser,place;
    before(async (done) => {
      try {

        testUser = await User.create({
          "username": "testuser",
        });

        place = await Place.create({
          "name": 'Test',
          "address": 'address',
          "latitude": 0,
          "longitude": 0,
        })
        await testUser.addPlace(place.id)

        done();
      } catch (e) {
        console.log(e);
        done(e);
      }
    });

    it('add.', async (done) => {
      try {

        let send = {
          userId: testUser.id,
          placeInfo: {
            name: 'AAA',
            address: 'test',
            latitude:10,
            longitude:-10
          }
        }
        let before = await testUser.getPlaces();
        console.log(send);
        let result = await PlaceService.add(send);
        let after = await testUser.getPlaces();
        after.length.should.be.above(before.length);
        done();

      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
