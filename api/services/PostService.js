module.exports = {

  create: async(data, req) => {
    try {
      let user = UserService.getLoginUser(req);
      console.log("???????????", data);
      // TODO: 加亂數是為了讓地標不重複
      let place = await Place.create({
        "latitude": parseFloat(data.location.latitude) + ((Math.random() * 2 - 1) / 10000),
        "longitude": parseFloat(data.location.longitude) + ((Math.random() * 2 - 1) / 10000),
      });
      let post = await Post.create({
        uuid: '',
        title: data.detail.title,
        startDate: data.detail.startDate,
        endDate: data.detail.endDate,
        user_id: user.id,
        coverImage: data.images
      });
      await post.addPlace(place.id);
      return post;
    } catch (e) {
      throw e;
    }
  },

  getAllPost: async() => {
    try {
      let getPost = await Post.findAll({
        include: [{
          model: Place
        }, {
          model: User
        }],
        order: 'createdAt DESC'
      });
      // sails.log.info("getPost[0]=>", JSON.stringify(getPost[0],null,2));

      let postArray = getPost.map((post) => {
        let pic = post.coverImage;
        if (!pic) pic = '/img/items/1.jpg';
        let data = {
          id: post.id,
          title: post.title,
          mode: post.mode || 'give',
          price: post.price || '',
          location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
          latitude: post.Places[0].latitude,
          longitude: post.Places[0].longitude,
          url: `/post/${post.id}`,
          type: '',
          type_icon: "../icons/give.png",
          gallery: [pic],
          content: post.content || '',
          itemname: post.title || '',
          username: post.User.username || post.User.fullName || post.User.fullName
        };
        return data;
      });

      postArray = {
        data: postArray
      }
      return postArray;
    } catch (e) {
      throw e;
    }
  },

  getPostById: async(id) => {
    try {
      let post = await await Post.findOne({
        where: {
          id: id
        },
        include: [{
          model: Place
        }, {
          model: User
        }],
      });

      let pic = post.coverImage;
      if (!pic) pic = '/img/items/1.jpg';

      let data = {
        id: post.id,
        title: post.title,
        mode: post.mode || 'give',
        price: post.price || '',
        location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
        latitude: post.Places[0].latitude,
        longitude: post.Places[0].longitude,
        url: `/post/${post.id}`,
        type: '',
        type_icon: "../icons/give.png",
        gallery: pic,
        content: post.content || '',
        itemname: post.title || '',
        username: post.User.username || post.User.fullName || post.User.fullName,
        email: post.User.email || '',
        telephone: post.User.telephone || '',
      };
      return data;
    } catch (e) {
      throw e;
    }
  },

  getAllCategory: async() => {
    try {
      // let like = await Like.findAll();
      let like = [{
        id:0,
        title: '時尚',
        pic: '/img/hobby/fashion-woman.png'
      }, {
        id:1,
        title: '美妝保養',
        pic: '/img/hobby/beauty.png'
      }, {
        id:2,
        title: '設計工藝',
        pic: '/img/hobby/Design-Process.png'
      }, {
        id:3,
        title: '生活3C',
        pic: '/img/hobby/TechnologyProducts.png'
      }, {
        id:4,
        title: '運動用品',
        pic: '/img/hobby/sport-foot.png'
      }, {
        id:5,
        title: '攝影拍照',
        pic: '/img/hobby/camera.png'
      }, {
        id:6,
        title: '名牌精品',
        pic: '/img/hobby/famousbrand.png'
      }, {
        id:7,
        title: '復古風情',
        pic: '/img/hobby/Retro.png'
      }, {
        id:8,
        title: '遊戲玩物',
        pic: '/img/hobby/game.png'
      }, {
        id:9,
        title: '傢具傢居',
        pic: '/img/hobby/Furniture.png'
      }, {
        id:10,
        title: '課本買賣',
        pic: '/img/hobby/books.png'
      }, {
        id:11,
        title: '書籍雜誌',
        pic: '/img/hobby/magazines.png'
      }, {
        id:0,
        title: '樂器樂譜',
        pic: '/img/hobby/ukulele.png'
      }, {
        id:12,
        title: '廚房家電',
        pic: '/img/hobby/kitchen.png'
      }, {
        id:13,
        title: '寶寶時尚',
        pic: '/img/hobby/baby.png'
      }, {
        id:14,
        title: '寵物用品',
        pic: '/img/hobby/dog.png'
      }, {
        id:15,
        title: '票卷交換',
        pic: '/img/hobby/tickets.png'
      }, {
        id:16,
        title: '哩哩扣扣',
        pic: '/img/hobby/other.png'
      }, {
        id:17,
        title: '預售代購',
        pic: '/img/hobby/sale.png'
      }]
      sails.log.info(like);
      return like;
    } catch (e) {
      throw e;
    }
  },

  // search
  getPostByKeyword: async(keyword) => {
    try {
      let getPosts = await Post.findAll({
        where: {
          'title': {
            $like: '%' + keyword + '%'
          }
        },
        include: [{
          model: Place
        }, {
          model: User
        }],
        order: 'createdAt DESC'
      });
      var data = [];
      getPosts.forEach(function(post) {
        let pic = post.coverImage;
        if (!pic) pic = '/img/items/1.jpg';
        data.push({
          id: post.id,
          title: post.title,
          mode: post.mode || 'give',
          price: post.price || '',
          location: post.Places[0].name || post.Places[0].address || `${post.Places[0].latitude},${post.Places[0].longitude}`,
          latitude: post.Places[0].latitude,
          longitude: post.Places[0].longitude,
          url: `/post/${post.id}`,
          type: '',
          type_icon: "../icons/give.png",
          gallery: [pic],
          content: post.content || '',
          itemname: post.title || '',
          username: post.User.username || post.User.fullName || post.User.fullName,
          email: post.User.email || '',
          telephone: post.User.telephone || '',
        });
      }); // end forEach
      console.log("data length=>", data.length);
      return data;
    } catch (e) {
      throw e;
    }
  }, // end search

  delete: async(userId, postId) => {
    try {
      let post = await Post.findById(postId);
      if (post.UserId == userId) {
        await post.destroy();
      } else {
        throw Error('Permissions denied')
      }
      return 'ok'
    } catch (e) {
      console.log(e);
      throw e
    }
  }

}
