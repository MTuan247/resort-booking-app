module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("order", {
    order_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    resort_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    email: {
      type: Sequelize.STRING
    },
    tel: {
      type: Sequelize.STRING
    },
    from_date: {
      type: Sequelize.DATE,
    },
    to_date: {
      type: Sequelize.DATE,
    },
    cost: {
      type: Sequelize.DECIMAL(22, 4)
    },
    status: {
      type: Sequelize.INTEGER
    },
  });

  return order;
};