import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Courses from "./courses";
import Reviews from "./reviews";

interface LessonAttributes {
    id?: number;
    title: string;
    description: string;
    video: string;
    courseId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Lessons extends Model<LessonAttributes> implements LessonAttributes {
    public readonly id!: number;
    public title!: string;
    public description!: string;
    public video!: string;
    public courseId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Lessons.init(
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
        video:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        courseId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Courses,
                key:"id"
            },
            onDelete:"CASCADE",
            onUpdate:"CASCADE"
        }
    },
    {
        sequelize:sequelize,
        modelName:"Lessons",
        timestamps:true
    }
)

Lessons.hasMany(Reviews,{
    foreignKey:"reviewableId",
    constraints:false,
    scope:{
        reviewableType:"lesson"
    },
    as:"reviews"
})

export default Lessons