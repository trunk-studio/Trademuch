/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    uuid: {
      type: Sequelize.UUID
    },
    type: {
      type: Sequelize.ENUM('public', 'announce', 'private'),
      defaultValue: 'public'
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    speakRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'speak_read'
    }

  },
  options: {
    underscored: true,
    tableName: 'chat'
  },
  associations: function() {
    Chat.belongsTo(Room, {
      through: 'room_id'
    });
    Chat.belongsTo(User, {
      through: 'user_id'
    });
  }
};
