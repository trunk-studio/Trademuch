describe.skip('about Item Service operation.', function() {

  describe('update lile item', () => {

    let like3c;
    before(async (done) => {

      like3c = await Like.create({
        title: '測試用生活3C'
      });
      await Item.create({
        itemname: "Server",
        LikeId: like3c.id
      })
      done();
    });

    it('update should success.', async (done) => {
      try {

        console.log(like3c)
        let check = await like3c.getItems();
        console.log("check length",check.length);

        let send = {
          LikeId: like3c.id,
          itemname: 'iphone6s'
        }

        await ItemService.create(send);

        let update = await like3c.getItems();
        update.length.should.be.an.above(check.length);

        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });

  });

  describe('find like item', () => {

    let like3c;
    before(async (done) => {

      like3c = await Like.create({
        title: '測試用生活3C'
      });
      await Item.create({
        itemname: "Server",
        LikeId: like3c.id
      })
      done();
    });

    it('find should success', async (done) =>{
      try{
        let likearray = await ItemService.findByLikeId(like3c.id);

        likearray.should.be.Array;
        done();
      } catch (e) {
        sails.log.error(e);
        done(e);
      }
    });
  });

});
