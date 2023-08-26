import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import ILogin from '../../Interfaces/login/ILogin';

class SequelizeLogin extends Model<InferAttributes<SequelizeLogin>,
InferCreationAttributes<SequelizeLogin>> {
  declare id: CreationOptional<ILogin['id']>;
  declare username: ILogin['username'];
  declare role: ILogin['role'];
  declare email: ILogin['email'];
  declare password: ILogin['password'];
}

SequelizeLogin.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  underscored: true,
});

export default SequelizeLogin;
