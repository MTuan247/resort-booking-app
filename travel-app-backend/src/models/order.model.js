module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("order", {
    from_date: {
      type: Sequelize.DATE,
    },
    to_date: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.INTEGER
    },
  });

  return order;
};