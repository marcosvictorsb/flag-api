import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@infra/database/connection/mysql';
import ProjectModel from '@domains/api/projects/model/project.model';

class EnvironmentModel extends Model {
  declare id?: number;
  declare type: string;
  declare key: string;
  declare id_project: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

EnvironmentModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    type: { type: DataTypes.STRING },
    key: { type: DataTypes.STRING, allowNull: false },
    id_project: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
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
    tableName: 'environments',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
);

EnvironmentModel.belongsTo(ProjectModel, {
  foreignKey: 'id_project',
  as: 'projects'
});

export default EnvironmentModel;
