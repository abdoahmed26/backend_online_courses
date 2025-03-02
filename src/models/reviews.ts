import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Users from "./users";

interface ReviewAttributes {
    id?: number;
    userId: number;
    reviewableId: number;
    reviewableType: "course" | "lesson";
    rating: number;
    comment: string;
}

class Reviews extends Model<ReviewAttributes> implements ReviewAttributes {
    public readonly id!: number;
    public userId!: number;
    public reviewableId!: number;
    public reviewableType!: "course" | "lesson";
    public rating!: number;
    public comment!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Reviews.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        reviewableId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reviewableType: {
            type: DataTypes.ENUM("course", "lesson"),
            allowNull: false,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Reviews",
        timestamps: true,
    }
);


export default Reviews;