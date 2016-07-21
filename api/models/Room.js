/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  // autosubscribe: ['destroy', 'update', 'add:users', 'remove:users'],
  // attributes: {
  //   name: 'string',
  //   users: {
  //     collection: 'user',
  //     via: 'rooms'
  // }
  attributes: {

    uuid: {
      type: Sequelize.UUID
    },
    type: {
      type: Sequelize.ENUM('private', 'public'),
      defaultValue: 'public'
    },
    limit: {
      type: Sequelize.INTEGER
    }

  },
  options: {
    underscored: true,
    tableName: 'room'
  },
  associations: function() {
    Room.hasMany(Chat, {foreignKey: 'room_id'});
    // to show online people
    Room.belongsToMany(User, {foreignKey: 'room_id', through: RoomUser});
  }

};
