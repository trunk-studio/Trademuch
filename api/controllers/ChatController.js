module.exports = {

  // send chat view
  chatView: async(req, res) => {
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');
    let roomId = req.param('roomId') || -1;
    sails.log.info('ChatController.chatView:postId =>', postId);
    sails.log.info('ChatController.history:roomId =>', roomId);

    try {
      let loginState = await UserService.getLoginState(req);
      sails.log.info("==== user login status ===>", loginState);

      let history, user, userFBId, date, time;

      if (loginState) {
        user = await UserService.getLoginUser(req);
        userFBId = await UserService.getFBId(user.id);
        user.fbId = userFBId;
        sails.log.info("==== logined User is ===>", user);

        history = await ChatService.history({
          socketId,
          postId,
          userId: user.id,
        });
        sails.log.info('ChatController.chatView:history =>', JSON.stringify(history));
      } // end if

      res.view('pages/chat', {
        user,
        history
      });
    } catch (e) {
      res.serverError(e.toString());
    }
  },


  // get chat history
  history: async(req, res) => {
    // if (!req.isSocket) {
    //   return res.badRequest('This endpoints only supports socket requests.');
    // }
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');
    let roomId = req.param('roomId') || -1;
    sails.log.info('ChatController.history:postId =>', postId);
    sails.log.info('ChatController.history:roomId =>', roomId);

    try {
      let history = await ChatService.history({
        socketId,
        postId,
        roomId,
      });
      sails.log.info('ChatController.history:history =>', JSON.stringify(history));

      return res.ok(history);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end history


  // get client socket id
  getId: async(req, res) => {
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let socketId = sails.sockets.id(req);
      return res.ok(socketId);
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end getId


  // Send global message
  announce: async(req, res) => {
    if (_.isUndefined(req.param('content'))) {
      return res.badRequest('`content` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }

    try {
      let socketId = sails.sockets.id(req);
      let content = req.param('content');
      let postId = req.param('postId');
      let login = await UserService.getLoginState(req);

      if (!login) {
        return res.badRequest('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let chat = await Chat.create({
        'room_id': postId,
        'user_id': user.id,
        'content': content,
        'type': 'announce'
      });

      if (postId) {
        sails.log.info("=== broadcast to postId ==>", postId);
        sails.sockets.broadcast(postId, "announce", {
          'user': user,
          'content': content
        }, req);
      } else {
        sails.log.info("=== blast ===");
        sails.sockets.blast("announce", {
          'user': user,
          'content': content
        });
      }

      return res.ok({
        message: 'user\'' + user.username + '\' says ' + content + ' to room uuid ' + postId
      });
    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end announce


  // Send a private message user one user to another
  private: async(req, res) => {

    // to-do todo wip

  }, // end private


  // Post a message in a public chat room
  public: async(req, res) => {
      let params = ['content', 'postId'];
      params.forEach(function(param, index) {
        if (_.isUndefined(req.param(param))) {
          return res.badRequest(param + ' is required.');
        }
      });
      if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
      }

      try {
        let socketId = sails.sockets.id(req);
        let content = req.param('content');
        let postId = req.param('postId');
        let login = await UserService.getLoginState(req);

        if (!login) {
          return res.badRequest('please log in.');
        }

        sails.log.info('ChatController.public:room uuid=>', postId);
        sails.log.info('ChatController.public:socketId=>', socketId);
        sails.log.info('ChatController.public:content=>', content);

        let user = await UserService.getLoginUser(req);
        let userFBId = await UserService.getFBId(user.id);
        user.fbId = userFBId;
        let room = await Room.findOne({
          where: {
            uuid: postId
          }
        });
        let chat = await Chat.create({
          'room_id': room.id,
          'user_id': user.id,
          'content': content,
          'type': 'public'
        });

        sails.log.info('RoomService.public:user=>', user.username);

        sails.sockets.broadcast(postId, "public", {
          'user': user,
          'content': content
        }, req);

        return res.ok({
          chat,
          user,
          message: 'user\'' + user.username + '\' says ' + content + ' to room uuid ' + postId
        });
      } catch (e) {
        res.serverError(e.stack.toString());
      }
    } // end public

};
