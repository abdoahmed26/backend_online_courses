import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import PlansFeatures from "./plansFeatures";
import Features from "./features";

interface PlanAttributes {
    id?: number;
    name: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Plans extends Model<PlanAttributes> implements PlanAttributes {
    public readonly id!: number;
    public name!: string;
    public price!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Plans.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: "plans",
        timestamps: true,
    }
);

Plans.belongsToMany(Features,{through:PlansFeatures,foreignKey:"planId",as:"features"})

Features.belongsToMany(Plans,{through:PlansFeatures,foreignKey:"featureId",as:"plans"})

export default Plans;