module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    location_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    location_name: {
      type: Sequelize.STRING,
    },
    parent_id: {
      type: Sequelize.UUID
    },
    type: {
      type: Sequelize.INTEGER
    },
  });

  return Location;
};