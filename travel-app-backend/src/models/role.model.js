module.exports = (sequelize, Sequelize) => {
  const role = sequelize.define("role", {
    role_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    role: {
      type: Sequelize.STRING
    },
    role_title: {
      type: Sequelize.STRING
    },
  });

  return role;
};