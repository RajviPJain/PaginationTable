const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('employee_db', 'root', 'P@ssword123', {
    host: 'localhost',
    dialect: 'mysql',
    logging:false/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.employee=require("./employee")(sequelize, DataTypes);
//   var Employee = db.employee;
  db.sequelize.sync({ force: false })


  module.exports = db;

