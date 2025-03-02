import { DataTypes, Model } from "sequelize";
import Plans from "./plans";
import Features from "./features";
import sequelize from "../config/db";

interface PlansFeaturesAttributes {
    id?: number;
    planId: number;
    featureId: number;
}

class PlansFeatures extends Model<PlansFeaturesAttributes> implements PlansFeaturesAttributes {
    public readonly id!:number;
    public planId!: number;
    public featureId!: number;
}

PlansFeatures.init(
    {
        planId: {
            type: DataTypes.INTEGER,
            references: {
                model: Plans,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        featureId: {
            type: DataTypes.INTEGER,
            references: {
                model: Features,
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize: sequelize,
        modelName: "PlansFeatures",
        timestamps: false,
    }
)

export default PlansFeatures