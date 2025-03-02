import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Reviews from "./reviews";
import Plans from "./plans";

interface UserAttributes {
    id?: number;
    full_name: string;
    email: string;
    password: string;
    role?: string;
    planId?: number;
}

// Define the Users model class
class Users extends Model<UserAttributes> implements UserAttributes {
    public readonly id!: number;
    public full_name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
    public planId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the Users model
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "vip", "admin", "superadmin", "manager"),
            allowNull: false,
            defaultValue: "user",
            validate:{
                isIn: [["user", "vip", "admin", "superadmin", "manager"]],
            }
        },
        planId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Plans,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        }
    },
    {
        sequelize,
        modelName: "Users",
        timestamps: true,
    }
);

Users.hasMany(Reviews, { foreignKey: "userId", as: "reviews" });
Reviews.belongsTo(Users, { foreignKey: "userId" , as: "user", onDelete: "CASCADE", onUpdate: "CASCADE" });
Users.belongsTo(Plans, { foreignKey: "planId", as: "plan" });
Plans.hasMany(Users, { foreignKey: "planId", as: "users" });

export default Users;