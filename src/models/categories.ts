import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

interface categoriesAttributes {
    id?: number;
    name: string;
    description: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Categories extends Model<categoriesAttributes> implements categoriesAttributes {
    public readonly id!: number;
    public name!: string;
    public description!: string;
    public image!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Categories.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:"categories",
        timestamps:true
    }
)

export default Categories;