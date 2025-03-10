import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Categories from "./categories";
import Lessons from "./lessons";
import Reviews from "./reviews";
import Plans from "./plans";

interface CourseAttributes {
    id?: number;
    title: string;
    description: string;
    price: number;
    image: string;
    level: string;
    author: string;
    categoryId: number;
    planId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Courses extends Model<CourseAttributes> implements CourseAttributes {
    public readonly id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public image!: string;
    public level!: string;
    public author!: string;
    public categoryId!: number;
    public planId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Courses.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        image:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        level:{
            type:DataTypes.STRING,
            allowNull:false
        },
        author:{
            type:DataTypes.STRING,
            allowNull:false
        },
        categoryId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Categories,
                key:"id"
            },
            onUpdate:"CASCADE",
            onDelete:"CASCADE"
        },
        planId:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:Plans,
                key:"id"
            },
            onUpdate:"CASCADE",
            onDelete:"SET NULL"
        }
    },
    {
        sequelize,
        modelName: "Courses",
        timestamps: true,
    }
)

Courses.hasMany(Lessons, {
    foreignKey: "courseId",
    as: "lessons",
});

Lessons.belongsTo(Courses,{foreignKey:"courseId",as:"course",onDelete:"CASCADE",onUpdate:"CASCADE"})

Courses.hasMany(Reviews,{
    foreignKey:"reviewableId",
    constraints:false,
    scope:{
        reviewableType:"course"
    },
    as:"reviews"
})

Categories.hasMany(Courses,{foreignKey:"categoryId",as:"courses"})
Courses.belongsTo(Categories, {
    foreignKey: "categoryId",
    as: "category",
});

export default Courses