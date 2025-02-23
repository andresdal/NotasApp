import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Nota from './Nota.js';

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categorias',
  timestamps: false,
});

Categoria.hasMany(Nota, { foreignKey: 'categoria_id' });
Nota.belongsTo(Categoria, { foreignKey: 'categoria_id' });

export default Categoria;