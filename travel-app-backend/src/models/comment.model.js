module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    comment_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
    },
    comment: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.UUID,
    },
    resort_id: {
      type: Sequelize.UUID,
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      field: 'created_date',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'modified_at',
      type: Sequelize.DATE,
    },
  }, {
    timestamps: true,
  });

  return Comment;
};