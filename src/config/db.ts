import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize({
    dialect:"postgres",
    host:process.env.DB_HOST,
    port:+(process.env.DB_PORT as string),
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    logging:false,
})

// const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         },
//     },
//     logging: false,
// });

export const connectDB = ()=>{
    sequelize.authenticate().then(()=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
        process.exit(1)
    })
}

export const syncWithDatabase = ()=>{
    sequelize
    .sync({alter: true})
    .then(() => {
        console.log("Models synchronized with the database.");
    })
    .catch((error) => {
        console.error("Unable to sync models:", error);
    });
}

export default sequelize