const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.resorts = require("./resort.model.js")(sequelize, Sequelize);
db.articles = require("./article.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.images = require("./image.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);
db.favourites = require("./favourite.model.js")(sequelize, Sequelize);
db.schedules = require("./schedule.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

// Config associations
db.resorts.hasMany(db.articles, {
  foreignKey: 'resort_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.resorts.hasMany(db.schedules, {
  foreignKey: 'resort_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

db.articles.belongsTo(db.resorts, {
  foreignKey: 'resort_id',
});

db.schedules.belongsTo(db.resorts, {
  foreignKey: 'resort_id',
});

db.articles.hasMany(db.images, {
  foreignKey: 'article_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.images.belongsTo(db.articles, {
  foreignKey: 'article_id',
});

db.roles.hasMany(db.users, {
  foreignKey: 'role_id',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION'
});
db.users.belongsTo(db.roles, {
  foreignKey: 'role_id',
});

db.users.belongsToMany(db.resorts, { through: db.favourites, foreignKey: "user_id", });
db.resorts.belongsToMany(db.users, { through: db.favourites, foreignKey: "resort_id" });

db.resorts.hasMany(db.comments, {
  foreignKey: 'resort_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.comments.belongsTo(db.resorts, {
  foreignKey: 'resort_id',
});

db.users.hasMany(db.comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.comments.belongsTo(db.users, {
  foreignKey: 'user_id',
});

db.users.hasMany(db.orders, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
});
db.orders.belongsTo(db.users, {
  foreignKey: 'user_id',
});

db.resorts.hasMany(db.orders, {
  foreignKey: 'resort_id',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
});
db.orders.belongsTo(db.resorts, {
  foreignKey: 'resort_id',
});

db.locations.hasMany(db.resorts, {
  foreignKey: 'location_id',
  as: 'fk_location_resort',
  onDelete: 'SET NULL',
  onUpdate: 'NO ACTION'
});

db.resorts.belongsTo(db.locations, {
  foreignKey: 'location_id',
  as: 'fk_resort_location',
});

// db.users.belongsToMany(db.resorts, { through: db.orders, foreignKey: "user_id", uniqueKey: 'order_id' });
// db.resorts.belongsToMany(db.users, { through: db.orders, foreignKey: "resort_id", uniqueKey: 'order_id' });

module.exports = db;