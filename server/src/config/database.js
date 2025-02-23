// filepath: /d:/Programacion/NotasApp/server/src/config/database.js
import { Sequelize } from 'sequelize';
//import dotenv from 'dotenv';

//dotenv.config();

const sequelize = new Sequelize("notas_app", "root", 'andydal2002', {
  host: "localhost",
  dialect: 'mysql',
  port: "3306",
});

export default sequelize;