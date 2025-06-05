import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@infra/database/connection/mysql';
import UserModel from '@domains/api/users/model/user.model';

class ProjectModel extends Model {
  declare id?: number;
  declare name: string;
  declare description: string;
  declare uuid: string;
  declare id_user?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

ProjectModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    uuid: { type: DataTypes.UUID },
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
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
    tableName: 'projects',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
);

ProjectModel.belongsTo(UserModel, {
  foreignKey: 'id_user',
  as: 'users'
});

export default ProjectModel;
