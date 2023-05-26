module.exports = (sequelize, Sequelize) => {
  const schedule = sequelize.define("schedule", {
    schedule_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    resort_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    from_date: {
      type: Sequelize.DATE,
    },
    to_date: {
      type: Sequelize.DATE,
    },
  });

  return schedule;
};