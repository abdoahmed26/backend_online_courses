import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Users from "./users";
import Plans from "./plans";

interface PaymentAttributes {
    id?: number;
    planId: number;
    userId: number;
    amount: number;
    amountReceived: number;
    paymentId: string;
    currency: string;
    paymentMethod: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Payments extends Model<PaymentAttributes> implements PaymentAttributes {
    public readonly id!: number;
    public planId!: number;
    public userId!: number;
    public amount!: number;
    public amountReceived!: number;
    public paymentId!: string;
    public currency!: string;
    public paymentMethod!: string;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Payments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Plans,
            key: "id"
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "id"
        }
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    amountReceived: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize:sequelize,
    modelName: "Payments",
    timestamps: true
})

Payments.belongsTo(Users,{foreignKey:"userId",as:"user"})
Users.hasMany(Payments,{foreignKey:"userId",as:"payments"})
Payments.belongsTo(Plans,{foreignKey:"planId",as:"plan"})
Plans.hasMany(Payments,{foreignKey:"planId",as:"payments"})

export default Payments