import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import IUser from '../../Interfaces/users/IUser';

class SequelizeUser extends Model<InferAttributes<SequelizeUser>,
InferCreationAttributes<SequelizeUser>> {
  declare id: CreationOptional<IUser['id']>;
  declare username: IUser['username'];
  declare role: IUser['role'];
  declare email: IUser['email'];
  declare password: IUser['password'];
}

SequelizeUser.init({
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

export default SequelizeUser;
