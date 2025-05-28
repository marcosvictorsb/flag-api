import ProjectModel from '@domains/api/projects/model/project.model';
import UserModel from '@domains/api/users/model/user.model';
import { sequelize } from '@infra/database/connection/mysql';
import { DataTypes, Model } from 'sequelize';

class FeatureFlagModel extends Model {
  declare id?: number;
  declare name: string;
  declare description: string;
  declare type: string;
  declare status: string;
  declare rollout?: number;
  declare variants?: Array<{ name: string; weight: number }>;
  declare targets?: Array<number | string>;
  declare id_user?: number;
  declare id_project?: number;
  declare created_at?: Date;
  declare updated_at?: Date;
  declare deleted_at?: Date;
}

FeatureFlagModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING, // DataTypes.ENUM('boolean', 'percentage', 'variant', 'targeted'),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING, //DataTypes.ENUM('enabled', 'disabled'),
      defaultValue: 'disabled'
    },
    rollout: {
      type: DataTypes.INTEGER, // usado para gradual rollout (0 a 100)
      allowNull: true,
      validate: { min: 0, max: 100 }
    },
    variants: {
      type: DataTypes.JSON, // exemplo: [{ name: 'A', weight: 50 }, { name: 'B', weight: 50 }]
      allowNull: true
    },
    targets: {
      type: DataTypes.JSON,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    id_project: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    created_at: {
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
    tableName: 'feature_flags',
    timestamps: true,
    underscored: true,
    paranoid: true
  }
);

FeatureFlagModel.belongsTo(UserModel, {
  foreignKey: 'id_user',
  as: 'users'
});

FeatureFlagModel.belongsTo(ProjectModel, {
  foreignKey: 'id_project',
  as: 'projects'
});

export default FeatureFlagModel;
