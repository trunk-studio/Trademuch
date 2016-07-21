// import fs from 'fs-extra';

let like;

let self = module.exports = {

  basicData: async () => {
    // like = [
    //   {title: '時尚', pic: '/img/hobby/fashion-woman.png'},
    //   {title: '美妝保養', pic: '/img/hobby/beauty.png'},
    //   {title: '設計工藝', pic: '/img/hobby/Design-Process.png'},
    //   {title: '生活3C', pic: '/img/hobby/TechnologyProducts.png'},
    //   {title: '運動用品', pic: '/img/hobby/sport-foot.png'},
    //   {title: '攝影拍照', pic: '/img/hobby/camera.png'},
    //   {title: '名牌精品', pic: '/img/hobby/famousbrand.png'},
    //   {title: '復古風情', pic: '/img/hobby/Retro.png'},
    //   {title: '遊戲玩物', pic: '/img/hobby/game.png'},
    //   {title: '傢具傢居', pic: '/img/hobby/Furniture.png'},
    //   {title: '課本買賣', pic: '/img/hobby/books.png'},
    //   {title: '書籍雜誌', pic: '/img/hobby/magazines.png'},
    //   {title: '樂器樂譜', pic: '/img/hobby/ukulele.png'},
    //   {title: '廚房家電', pic: '/img/hobby/kitchen.png'},
    //   {title: '寶寶時尚', pic: '/img/hobby/baby.png'},
    //   {title: '寵物用品', pic: '/img/hobby/dog.png'},
    //   {title: '票卷交換', pic: '/img/hobby/tickets.png'},
    //   {title: '哩哩扣扣', pic: '/img/hobby/other.png'},
    //   {title: '預售代購', pic: '/img/hobby/sale.png'}
    // ];
    // // await Like.bulkCreate(like);
    // for(let i of like){
    //   await Like.findOrCreate({
    //     where:{
    //       title: i.title
    //     },
    //     defaults: i
    //   });
    // }
    if (sails.config.environment === 'development' || sails.config.environment === 'test') {
      let user = await User.create({username: 'testuser', email: 'test@gmail.com'});
      let passport = await Passport.create({provider: 'local', password: 'testuser'});
      await self.testData();
    }
  },

  testData: async () => {

    let testUser2 = await User.create({
			"username": "testuser2",
    });

    let place = await Place.create({
      "name": 'Test',
      "address": 'address',
      "latitude": 0,
      "longitude": 0,
    })

    let post = await Post.create({
      "uuid": '12311231231',
      "title": "searchPost",
      "startDate": "2015-12-01",
      "user_id": testUser2.id
    });

    await post.addPlace(place.id)

    await ElasticsearchService.addPost({
      id: post.id,
      title: post.title,
      location:{
        lat: 0,
        lon: 0
      }
    })

    for (let i = 0; i < 10; i++) {
      let latitude = 24.148179 + Math.random() / 100;
      let longitude = 120.673187 + Math.random() / 100;
      let place = await Place.create({
        "latitude": latitude,
        "longitude": longitude,
      })
      let createPost = await Post.create({
        "title": "AAA",
        "startDate": "2015-12-01",
        "user_id": testUser2.id
      });
      await createPost.addPlace(place.id)

      await ElasticsearchService.addPost({
        id: createPost.id,
        title: createPost.title,
        location:{
          lat: latitude,
          lon: longitude
        },
        pic: '/img/items/1.jpg'
      })
    }
  }
}
