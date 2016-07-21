module.exports = {
  attributes: {
    uuid: {
      type: Sequelize.UUID
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: Sequelize.DATE,
      field: 'end_date'
    },

    coverImage:{
      type:Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      field: 'cover_image'
    },

    createdAt: {
      type: Sequelize.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: Sequelize.DATE,
      field: 'updated_at'
    },
    UserId: {
      type: Sequelize.UUID,
      field: 'user_id'
    }
  },
  associations: function() {
    Post.belongsTo(User, {through: 'user_id'});
    Post.belongsToMany(Place, {foreignKey: 'post_id', through: PostPlace});
    Post.belongsToMany(User, {foreignKey: 'post_id', through: UserFavorite});
  },
  options: {
    classMethods: {},
    instanceMethods: {},
    hooks: {},
    tableName: 'post',
    paranoid: true,
  }
};
