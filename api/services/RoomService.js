module.exports = {

  list: async(postId) => {
    try {
      // check room exist or cteate a room.
      let findRoom = await Room.findOne({
        where: {
          'uuid': postId
        }
      });

      if (!findRoom) {
        throw Error('room uuid `' + postId + '` doesn`t exist!');
      }

      // get online list and count it again.
      let online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      // get users
      let name, users = [];
      for (let member of online) {
        users.push(member.user_id);
      }
      users = await User.findAll({
        where: {
          id: users
        }
      });

      // merge room info
      let room = {
        id: findRoom.id,
        uuid: findRoom.uuid,
        type: findRoom.type,
        limit: findRoom.limit,
        count: online.length,
        users: users
      };

      return room;

    } catch (e) {
      throw e;
    }
  }, //end list


  'join': async(data) => {
    try {
      let newRoom = false;

      // check room exist or cteate a room.
      let findRoom = await Room.findOne({
        where: {
          'uuid': data.postId
        }
      });
      if (!findRoom) {
        findRoom = await Room.create({
          'uuid': data.postId,
          'type': data.type,
          'limit': data.limit
        });
        newRoom = true;
      }

      // get online list and count before add user into.
      let online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      if (findRoom.limit || findRoom.limit != 0) {
        sails.log.info("=== this room has meber limit ==>", findRoom.limit);
        if (online.length >= findRoom.limit) {
          sails.log.info("=== reach room online limit! ==");
          throw Error('reach room online limit.');
        }
      }

      // check if room exists user and the online state.
      let findUser = await RoomUser.findOne({
        where: {
          'user_id': data.user.id,
          'room_id': findRoom.id
        }
      });
      // change online state
      if (findUser) {
        sails.log.info("=== reconnect user to room record ==");
        if (findUser.online === false) {
          findUser.online = true;
          findUser = await findUser.save();
        }
      } else {
        sails.log.info("=== add user to room record ==");
        await findRoom.addUser(data.user.id);
      }

      // get online list and count it again.
      online = await RoomUser.findAll({
        where: {
          room_id: findRoom.id,
          online: true
        }
      });

      // get users
      let name, users = [];
      for (let member of online) {
        users.push(member.user_id);
      }
      users = await User.findAll({
        where: {
          id: users
        }
      });

      // merge room info
      let room = {
        id: findRoom.id,
        uuid: findRoom.uuid,
        type: findRoom.type,
        limit: findRoom.limit,
        count: online.length,
        users: users,
        state: newRoom ? "new" : "join"
      };

      sails.log.info('RoomService.join:user=>', data.user.username);
      sails.log.info('RoomService.join:request room id=>', data.postId);
      sails.log.info('RoomService.join:socketId=>', data.socketId);
      sails.log.info('RoomService.join:room =>', room);

      return room;

    } catch (e) {
      throw e;
    }

  }, // end join


  'leave': async(data) => {
    try {
      // find target room.
      let room = await Room.findOne({
        where: {
          uuid: data.postId
        }
      });
      if (!room) {
        throw Error('room uuid `' + data.postId + '` doesn`t exist!');
      }

      // change state flag.
      let roomUser = await RoomUser.findOne({
        where: {
          room_id: room.id,
          user_id: data.user.id
        }
      });
      if (roomUser.online === false) {
        throw Error('user id `' + data.user.id + '` has already leaved room id `' + data.postId + '`!');
      }

      roomUser.online = false;
      roomUser = await roomUser.save();

      let findUser = await User.findOne({
        where: {
          id: data.user.id
        }
      });

      // reassemble user info with fbId
      let leavedUser = {
        id: findUser.id,
        email: findUser.email,
        fullName: findUser.fullName,
        gender: findUser.gender,
        username: findUser.username,
        telephone: findUser.telephone,
        age: findUser.age
      };
      leavedUser.fbId = await UserService.getFBId(findUser.id);

      let leavedRoom = {
        room: room,
        user: leavedUser
      };

      sails.log.info('RoomService.leave:user=>', data.user.username);
      sails.log.info('RoomService.leave:room uuid=>', data.postId);
      sails.log.info('RoomService.leave:socketId=>', data.socketId);
      sails.log.info('RoomService.leave:room index =>', room.id);

      return leavedRoom;

    } catch (e) {
      throw e;
    }
  }, // end leave


  'setLimit': async(data) => {
    try {
      let room = await Room.findOne({
        where: {
          uuid: data.postId
        }
      });
      if (!room) {
        throw Error('room uuid `' + data.postId + '` doesn`t exist!');
      }
      room.limit = data.limit;
      room = await room.save();

      sails.log.info('RoomService.setLimit:room new limit =>', data.limit);
      sails.log.info('RoomService.setLimit:room uuid=>', data.postId);
      sails.log.info('RoomService.setLimit:socketId=>', data.socketId);
      sails.log.info('RoomService.setLimit:room id =>', data.room.id);

      return room;

    } catch (e) {
      throw e;
    }
  }, // end setLimit


  'getLimit': async(data) => {
    try {
      let room = await Room.findOne({
        where: {
          uuid: data.postId
        }
      });
      if (!room) {
        throw Error('room uuid `' + postId + '` doesn`t exist!');
      }

      sails.log.info('RoomService.getLimit:room new limit =>', data.limit);
      sails.log.info('RoomService.getLimit:room uuid=>', data.postId);
      sails.log.info('RoomService.getLimit:socketId=>', data.socketId);
      sails.log.info('RoomService.getLimit:room id =>', data.room.id);

      let limit = room.limit | 0;

      return limit;

    } catch (e) {
      throw e;
    }
  }, // end getLimit

};
