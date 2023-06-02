module.exports = (sequelize, Sequelize) => {
  const Resort = sequelize.define("resort", {
    resort_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    parent_id: {
      type: Sequelize.UUID,
    },
    parent_name: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    from_cost: {
      type: Sequelize.DECIMAL(22, 4)
    },
    to_cost: {
      type: Sequelize.DECIMAL(22, 4)
    },
    type: {
      type: Sequelize.INTEGER
    },
    min_people: {
      type: Sequelize.INTEGER
    },
    max_people: {
      type: Sequelize.INTEGER
    },
  });

  return Resort;
};