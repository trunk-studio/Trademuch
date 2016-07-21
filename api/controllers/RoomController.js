module.exports = {

  // List a chat room member and online count -- this is bound to 'get /rest/room/:postId/list'
  'list': async(req, res) => {
    if (_.isUndefined(req.param('postId'))) {
      return res.badRequest('`postId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.list(postId);
      sails.log.info('ListRoom', room);

      return res.ok(
        room
      );

    } catch (e) {
      res.serverError(e.toString());
    }
  }, // end list


  // Join a chat room -- this is bound to 'post /rest/room/:postId/users'
  // if exists userId means is a private chat.
  'join': async(req, res) => {
    if (_.isUndefined(req.param('postId'))) {
      return res.badRequest('`postId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');
    let limit = req.param('limit') | 0;
    let userId = req.param('userId');
    let type = userId != undefined ? 'private' : 'public';

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await RoomService.join({
        socketId,
        postId,
        user,
        limit,
        type
      });
      sails.log.info('joinRoom', room);

      if (!room) {
        throw Error('join room `' + postId + '` failed.');
      }

      sails.sockets.join(req, postId, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(postId, "join", {
          room,
          'message': user.username + " join"
        });
      });

      return res.ok({
        room,
        message: 'Subscribed to a fun room id ' + room.id + '! (room uuid ' + room.uuid + ')'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end join


  // Leave a chat room -- this is bound to 'delete /rest/room/:postId/users'
  'leave': async(req, res, next) => {
    if (_.isUndefined(req.param('postId'))) {
      return res.badRequest('`postId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let user = await UserService.getLoginUser(req);
      let room = await RoomService.leave({
        socketId,
        postId,
        user
      });
      sails.log.info('leaveRoom', room);

      if (!room) {
        throw Error('leave room `' + postId + '` failed.');
      }

      sails.sockets.leave(req, postId, function(err) {
        if (err) {
          throw Error(err);
        }
        sails.sockets.broadcast(postId, "leave", {
          room,
          'message': room.user.username + " leaved."
        });
      });

      return res.ok({
        room,
        message: 'leaved room ' + room.id + '!'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end leave


  // Limit a chat room's total member -- this is bound to 'put /rest/room/:postId/limit'
  'SetLimit': async(req, res, next) => {
    if (_.isUndefined(req.param('postId'))) {
      return res.badRequest('`postId` is required.');
    }
    if (!req.isSocket) {
      return res.badRequest('This endpoints only supports socket requests.');
    }
    let socketId = sails.sockets.id(req);
    let postId = req.param('postId');
    let limit = req.param('limit');

    try {
      let login = await UserService.getLoginState(req);
      if (!login) {
        return res.serverError('please log in.');
      }

      let room = await RoomService.setLimit({
        socketId,
        postId,
        limit
      });
      sails.log.info('limitedRoom', room);

      return res.ok({
        room,
        message: 'limit room `' + req.param('postId') + '` member to `' + req.param('limit') + '`.'
      });

    } catch (e) {
      res.serverError(e.toString());
    }

  }, // end SetLimit


  // Limit a chat room's total member -- this is bound to 'set /rest/room/:postId/limit'
  'getLimit': async(req, res) => {
      if (_.isUndefined(req.param('postId'))) {
        return res.badRequest('`postId` is required.');
      }
      if (!req.isSocket) {
        return res.badRequest('This endpoints only supports socket requests.');
      }
      try {
        let login = await UserService.getLoginState(req);
        if (!login) {
          return res.serverError('please log in.');
        }

        let roomLimit = await RoomService.getLimit(req);

        sails.log.info('roomLimit', roomLimit);

        return res.ok({
          roomLimit,
          'message': "the limit of room `" + req.param('postId') + "` is `" + roomLimit + "`."
        });

      } catch (e) {
        res.serverError(e.toString());
      }

    } // end getLimit

};
