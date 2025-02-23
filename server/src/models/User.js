import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Nota from './Nota.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

User.hasMany(Nota, { as: 'notas', foreignKey: 'user_id' });
Nota.belongsTo(User, { foreignKey: 'user_id' });

export default User;