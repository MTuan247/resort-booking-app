module.exports = (sequelize, Sequelize) => {
  const Image = sequelize.define("image", {
    image_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    article_id: {
      type: Sequelize.UUID,
    },
    resort_id: {
      type: Sequelize.UUID,
    },
    file_name: {
      type: Sequelize.STRING
    },
    src: {
      type: Sequelize.TEXT
    },
  });

  return Image;
};