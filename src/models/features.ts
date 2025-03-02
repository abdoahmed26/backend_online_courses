import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface FeaturesAttributes {
    id?: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}
class Features extends Model<FeaturesAttributes> implements FeaturesAttributes {
    public readonly id!: number;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Features.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"name is required"
                }
            }
        },
    },
    {
        sequelize,
        modelName: "features",
        timestamps: true,
    }
);

export default Features