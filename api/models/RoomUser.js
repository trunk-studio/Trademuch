module.exports = {
  attributes: {
    online: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },

  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'room_user',
    underscored: true
  }
};
