import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../infra/database/connection/mysql';

interface UserModelAttributes {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

class UserModel
  extends Model<UserModelAttributes>
  implements UserModelAttributes
{
  declare id?: number;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password_hash: { type: DataTypes.STRING },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    sequelize: sequelize,
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
);
export default UserModel;
