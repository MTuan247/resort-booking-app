module.exports = (sequelize, Sequelize) => {

  const infomation = sequelize.define("infomation", {

    infomation_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    resort_id: {
      type: Sequelize.UUID,
    },
    have_pool: {
      type: Sequelize.BOOLEAN
    },
    
  });

  return infomation;
};