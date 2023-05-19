module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "12345678@Abc",
  DB: "resort_app",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};