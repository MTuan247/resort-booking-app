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

// Config associations
db.resorts.hasMany(db.articles, {
  foreignKey: 'resort_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.articles.belongsTo(db.resorts, {
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

db.users.belongsToMany(db.resorts, { through: 'favourites' });
db.resorts.belongsToMany(db.users, { through: 'favourites' });

module.exports = db;